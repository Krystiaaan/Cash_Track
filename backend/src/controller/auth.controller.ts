import {Router, Request, Response} from "express";
import { db } from "../drizzle/db";
import { LoginSchema,RegisterUserDTO, RegisterUserSchema } from "../drizzle/zodValidationSchema";
import { Auth } from "../middleware/auth.middleware";
import { eq } from "drizzle-orm";
import { UserTable } from "../drizzle/schema";
import * as dotenv from "dotenv";
dotenv.config();

const router = Router({mergeParams: true});

router.post("/register", async(req: Request, res: Response) =>{
    const validationResult = RegisterUserSchema.safeParse(req.body);
    console.log(validationResult);
    if(!validationResult.success){
        return res.status(400).send({ errors: validationResult.error.errors });
    }
    
    const RegisterUserDTO: RegisterUserDTO = {
        ...validationResult.data,
        passwordHash: await Auth.hashPassword(validationResult.data.passwordHash),
    };

    const existingUserByMail = await db.query.UserTable.findFirst({
        where: eq(UserTable.email, RegisterUserDTO.email),
    });
    if(existingUserByMail){
        return res.status(400).send({errors: ["User with this email already exists"]});
    }

    const existingUserByUsername = await db.query.UserTable.findFirst({
        where: eq(UserTable.username, RegisterUserDTO.username),
    });
    if(existingUserByUsername){
        return res.status(400).send({errors: ["User with this username already exists"]});
    }
    try {
        const newUser = await db.insert(UserTable).values({
            ...RegisterUserDTO,
        }).returning({
            id:UserTable.id,
            email:UserTable.email,
            username:UserTable.username,
            currency:UserTable.currency,
            password:UserTable.passwordHash,
        });
        return res.status(201).send(newUser);
    }
    catch(error){
        console.error("Error inserting user:", error);
        res.status(503).json({error: "Service Unavailable"});
    }
}); 
router.post("/login", async(req: Request, res: Response)=> {
    const validationResult = LoginSchema.safeParse(req.body);
    
    if(!validationResult.success){
        return res.status(400).send({ errors: validationResult.error.errors });
    }
    const user = await db.query.UserTable.findFirst({
        where: eq(UserTable.email, validationResult.data.email),
    });
    if (!user) {
        return res.status(400).json({ errors: ["User does not exist"] });
    }
    const matchingPassword = await Auth.comparePasswordWithHash(validationResult.data.password, user.passwordHash);
    if(!matchingPassword){
        return res.status(401).send({ errors: ["Incorrect password"]});
    }
    const jwt = Auth.generateToken({
        id:user.id,
        email:user.email,
        username:user.username,
    });

    res.status(200).send({accessToken: jwt,
        user: {
            id: user.id,
            email: user.email,
            username: user.username
        }
    });
})

export const AuthController = router;
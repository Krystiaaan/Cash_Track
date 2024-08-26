import { Router, Request, Response } from "express";
import {db} from "../drizzle/db";
import { UserTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

interface User {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    currency: string;
    created_at: Date;
}

const router = Router({mergeParams: true});
// Route to get all users
router.get("/", async (req: Request, res: Response) =>{
    try {
        const users: User[] = await db.select().from(UserTable);
        
        if(users.length === 0){
            return res.status(404).json({error: "No users found"});
        }
        return res.status(200).json(users);
    }
    catch(error){
        console.error("Error fetching users:", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
// Route to get a user by ID
router.get("/:userId", async(req: Request, res: Response) =>{
    try {
        const userId = req.params.userId;
        const user: User[] = await db.select().from(UserTable).where(eq(UserTable.id, userId));
        if(user.length === 0){
            return res.status(404).json({error: "User not Found"});
        }
        return res.status(200).json(user[0]);

    }
    catch(error){
        console.error("Error fetching user:", error);
        return res.status(503).json({error: "Service Unavailable"});
  
    }
});





export const UserController = router;
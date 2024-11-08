import {Router, Request, Response } from "express";
import {db} from "../drizzle/db";
import { AccountsTable } from "../drizzle/schema";
import { eq, and} from "drizzle-orm";

interface Account {
    id: string;
    user_id: string | null;
    accountName: string;
    accountType: string;
    balance: number | null;
    created_at: Date;
}

const router = Router({mergeParams: true});
//Route to get all accounts
router.get("/", async(req: Request, res: Response) => {
    try {
        const accounts: Account[] = await db.select().from(AccountsTable);

        if(accounts.length === 0){
            return res.status(404).json({error: "No Accounts found"});
        }
        return res.status(200).json(accounts);
    }
    catch(error){
        console.error("Error fetching account", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to get all accounts from a user
router.get("/:userId", async(req: Request, res:Response)=> {
    try {
        const userId = req.params.userId;
        const accounts: Account[]= await db.select().from(AccountsTable).where(eq(AccountsTable.user_id, userId));
        if(accounts.length === 0){
            return res.status(404).json({error: "No Accounts found from a user"});
        }
        return res.status(200).json(accounts);
    }catch(error){
        console.error("Error fetching accounts from a user", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to create a Account
router.post("/", async(req: Request, res: Response)=>{
    try {
    const {user_id, accountName, accountType, balance, created_at} = req.body;
        console.log( "user id", user_id);
    const accountData = {
        user_id,
        accountName,
        accountType,
        balance,
        created_at: created_at ? new Date(created_at) : new Date()
    };
    const result = await db.insert(AccountsTable).values(accountData).returning({
        id: AccountsTable.id
    }).execute();
    
    const accountId = result[0]?.id;

    if(!accountId){
        throw new Error("'Account Id not returned from the database");
    }
    return res.json({message: "Account added successfully", id: accountId});
    }catch(error){
        console.error("Error creating account", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route delete account from user
router.delete("/:userId/:accountId", async(req: Request, res: Response) =>{
try {
    const {userId, accountId} = req.params;

    if(!accountId || !userId){
        return res.status(400).json({message: "Invalid account id or user id"});
    }
    await db.delete(AccountsTable)
            .where(and(eq(AccountsTable.id, accountId), eq(AccountsTable.user_id, userId)))
            .execute();

    return res.json({message: "Account deleted successfully"});
}catch(error){
    console.error("Error Deleting Account", error);
    return res.status(503).json({error: "Service Unavailable"});
}
});
//Route to update user
router.put("/:userId/:accountId", async (req: Request, res: Response) => {
  try {
    const { userId, accountId } = req.params;
    const {accountName, accountType, balance} = req.body;
    if (!accountId || !userId) {
      return res.status(400).json({ message: "invalid account id or user id" });
    }
    const updateAccount = await db.update(AccountsTable).set({
        accountName: accountName,
        accountType: accountType,
        balance: balance,
    }).where(and(eq(AccountsTable.id, accountId), eq(AccountsTable.user_id, userId))).returning({
        id: AccountsTable.id,
        user_id: AccountsTable.user_id,
        accountName: AccountsTable.accountName,
        accountType: AccountsTable.accountType,
        balance: AccountsTable.balance,
    });
    if (updateAccount.length === 0) {
        return res.status(404).json({ message: "Account not found or no changes made" });
    }
    return res.status(200).json({message: "Account updated successfully", updateAccount});
  } catch (error) {
    console.error("Error updating Account", error);
    return res.status(503).json({ error: "Service Unavailable" });
  }
});

export const AccountController = router;
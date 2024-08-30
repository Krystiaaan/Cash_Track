import {Router, Request, Response} from "express";
import { db } from "../drizzle/db";
import { TransactionsTable } from "../drizzle/schema";
import {eq, and} from "drizzle-orm";

enum TransactionType {
    Income = "Income",
    Expense = "Expense",
    Transfer = "Transfer"
}
interface Transaction {
    id: string,
    user_id: string | null,
    account_id: string | null,
    category_id: string | null,
    transactionDate: Date | string | null,
    amount: number,
    description: string | null,
    transactionType: TransactionType | "Income" | "Expense" | "Transfer",
    created_at: Date |null,
}

const router = Router({mergeParams: true});

// Route to get all transactions
router.get("/", async(req: Request, res:Response)=> {
    try {
        const transactions: Transaction[] = await db.select().from(TransactionsTable);
        if(transactions.length === 0){
            return res.status(404).json({error: "No Transactions found"});
        }
        return res.status(200).json(transactions);
    }catch(error){
        console.error("Error fetching Transactions", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
// Route to get all transactions from a user
router.get("/:userId", async(req: Request, res:Response)=>{
    try {
        const userId= req.params.userId;
        const transactions: Transaction[]= await db.select().from(TransactionsTable).where(eq(TransactionsTable.user_id, userId));
        if(transactions.length === 0){
            return res.status(404).json({error: "No Transactions found from a user"});
        } 
        return res.status(200).json(transactions);
    }catch(error){
        console.error("Error fetching transactions from a user", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to get all transaction from a user and account
router.get("/:userId/:accountId", async (req: Request, res: Response) => {
  try {
    const {userId, accountId, transactionId} = req.params;
    if(!userId || !accountId || !transactionId){
        return res.status(400).json({message: "Invalid userId, AccountId or transactionId"});
    }
    const transactions: Transaction[] = await db.select().from(TransactionsTable)
                .where(and(eq(TransactionsTable.id, transactionId), eq(TransactionsTable.user_id, userId), eq(TransactionsTable.account_id, accountId)))
    if(transactions.length === 0){
        return res.status(404).json({error: "No Transactions found to Account"});
    }
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching Transactions from a user and account", error);
    return res.status(503).json({ error: "Service Unavailable" });
  }
});
//Route to get all transaction from a user account and categories
router.get("/:userId/:accountId/:categoryId", async(req: Request, res: Response)=>{
    try {
    const {userId, transactionId, accountId, categoryId} = req.params;
    if(!userId || !accountId || !transactionId || !categoryId){
        return res.status(400).json({message: "Invalid userId, AccountId, CategoryId or transactionId"});
    }
    const transactions: Transaction[] = await db.select().from(TransactionsTable)
    .where(and(eq(TransactionsTable.id, transactionId), eq(TransactionsTable.user_id, userId),
     eq(TransactionsTable.account_id, accountId), eq(TransactionsTable.category_id, categoryId)))
     if(transactions.length ===0){
        return res.status(404).json({error: "No Transaction with categories found"});
     }
     return res.status(200).json(transactions);
    }catch(error){
        console.error("Error fetching all Transaction from a user account and categories", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
// Route to create a Transaction
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      userId,
      accountId,
      categoryId,
      transactionDate,
      amount,
      description,
      transactionType,
      created_at,
    } = req.body;
    const transactionData = {
      userId,
      accountId,
      categoryId,
      transactionDate,
      amount,
      description,
      transactionType,
      created_at: new Date(created_at),
    };
    const result = await db
      .insert(TransactionsTable)
      .values(transactionData)
      .returning({
        id: TransactionsTable.id,
      })
      .execute();
    const transactionId = result[0]?.id;
    if (!transactionId) {
      throw new Error("Transaction Id not returned from the database");
    }
    return res.json({
      message: "Account added successfully",
      id: transactionId,
    });
  } catch (error) {
    console.error("error creating Transaction", error);
    return res.status(503).json({ error: "Service unavailable" });
  }
});
//Route to update Transaction
router.put("/:userId/:transactionId", async(req: Request, res: Response) =>{
    try{
        const {userId, transactionId}  = req.params;
        const {amount, description, transactionType} = req.body;

        if(!userId || !transactionId){
            return res.status(400).json({message: "Invalid userId or TransactionID"});
        }
        const updatedTransaction = await db.update(TransactionsTable).set({
            amount: amount,
            description: description,
            transactionType: transactionType,
        }).where(and(eq(TransactionsTable.id, transactionId), eq(TransactionsTable.user_id, userId)))
        .returning({
            id: TransactionsTable.id,
            user_id: TransactionsTable.user_id,
            account_id: TransactionsTable.account_id,
            category_id: TransactionsTable.category_id,
            transactionDate: TransactionsTable.transactionDate,
            amount: TransactionsTable.amount,
            description: TransactionsTable.description,
            transactionType: TransactionsTable.transactionType,
        });
        if(updatedTransaction.length === 0){
            return res.status(404).json({message: "Transaction not found"});
        }
        return res.status(200).json({message: "Transaction updated successfully", updatedTransaction});
    }catch(error){
        console.error("error updating Transaction",error);
        return res.status(503).json({error: "Service unavailable"});
    }
});
//Route to delete Transaction
router.delete("/:userId/:transactionId", async(req: Request, res: Response) =>{
    try {
        const {userId, transactionId} = req.params;

        if(!userId || !transactionId){
            return res.status(400).json({message: "Invalid user id or Transaction id"});
        }
        await db.delete(TransactionsTable)
            .where(and(eq(TransactionsTable.id, transactionId), eq(TransactionsTable.user_id, userId)))
            .execute();
            
        return res.json({message: "Account deleted successfully"});
    }catch(error){
        console.error("error deleting Transaction", error);
        return res.status(503).json({error: "Service Unavailable"})
    }
});
export const TransactionController = router;

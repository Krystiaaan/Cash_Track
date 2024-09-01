import {Router, Request, Response} from "express";
import { db } from "../drizzle/db";
import { BudgetTable } from "../drizzle/schema";
import {eq, and } from "drizzle-orm";

interface Budget {
    id: string,
    user_id: string | null,
    category_id: string | null,
    budgetName: string,
    amount: number,
    start_date: Date| string | null,
    end_date: Date | string |null,
    created_at: Date | null,
}

const router = Router({mergeParams: true});

//Route to get the budgets
router.get("/", async(req: Request, res: Response) =>{
    try {
        const budgets: Budget[] = await db.select().from(BudgetTable)

        if(budgets.length === 0){
            return res.status(404).json({error: "No Budgets found"});
        }
        return res.status(200).json(budgets);
    }catch(error){
        console.error("Error fetching Budget", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to get the budgets from one user
router.get("/:userId", async(req: Request, res: Response) =>{
    try{
        const {userId} = req.params;
        const budgets: Budget[] = await db.select().from(BudgetTable).where(eq(BudgetTable.id,userId));
        if(budgets.length === 0){
            return res.status(404).json({error: "No Budgets from a user found"});
        }
        return res.status(200).json(budgets);
    }catch(error){
        console.error("Error fetching Budget from a user", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to get the budgets from one user and the category
router.get("/:userId/:categoryId", async(req:Request, res:Response) =>{
    try{
    const {userId, categoryId} = req.params;
    const budgets: Budget[] = await db.select().from(BudgetTable).
    where(and(eq(BudgetTable.id, userId), eq(BudgetTable.category_id, categoryId)));
    if(budgets.length === 0){
        return res.status(404).json({error: "No Budgets from a user and category found"});
    }
    return res.status(200).json(budgets);
    }catch(error){
        console.error("Error fetching budget from a user with Category", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to create a budget
router.post("/", async(req:Request, res:Response)=>{
    try{
        const{userId, categoryId, budgetName, amount, start_date,end_date, created_at} = req.body;
        const budgetData = {
            userId,
            categoryId,
            budgetName,
            amount,
            start_date,
            end_date,
            created_at: new Date(created_at),
        }
        const result = await db.insert(BudgetTable).values(budgetData).returning({
            id: BudgetTable.id
        }).execute();
        const budgetId = result[0]?.id;
        if(!budgetId){
            throw new Error("Budget Id did not return from the database");
        }
        return res.json({message: "Budget successfully added", id:budgetId})
    }catch(error){
        console.error("Error creating new budget", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to update a budget
router.put("/:userId/:budgetId", async(req:Request, res:Response) =>{
    try{    
        const {userId, budgetId} = req.params;
        const {budgetName, amount, start_date, end_date} = req.body;
        
        if(!userId || !budgetId){
            return res.status(400).json({mesage: "Invalid userId or budgetId"});
        }
        const updatedBudget = await db.update(BudgetTable).set({
            budgetName: budgetName,
            amount: amount,
            start_date: start_date,
            end_date: end_date,
        }).where(and(eq(BudgetTable.user_id, userId), eq(BudgetTable.id, budgetId))).returning({
            id: BudgetTable.id,
            user_id: BudgetTable.user_id,
            category_id:BudgetTable.category_id,
            budgetName: BudgetTable.budgetName,
            amount: BudgetTable.amount,
            start_date: BudgetTable.start_date,
            end_date:BudgetTable.end_date,
        });
        if(updatedBudget.length === 0){
            return res.status(404).json({message: "Budget not found"});
        }
        return res.status(200).json({message: "Budget updated successfully", updatedBudget});
    }catch(error){
        console.error("Error updating the budget", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to delete a budget
router.delete("/:userId/:budgetId", async(req: Request, res:Response)=>{
    try{
        const {userId, budgetId} = req.params;
        if(!userId || !budgetId){
            return res.status(400).json({message: "Invalid user id or budget id"});
        }
        await db.delete(BudgetTable).where(and(eq(BudgetTable.user_id,userId), eq(BudgetTable.id, budgetId))).execute();

        return res.json({message: "Budget Deleted successfully"});
    }catch(error){
        console.error("Error deleting budget", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
export const BudgetController = router;

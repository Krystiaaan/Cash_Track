import {Router, Request, Response} from "express";
import { db } from "../drizzle/db";
import { SavingGoalsTable } from "../drizzle/schema";
import {eq, and} from "drizzle-orm";

interface SavingGoals{
    id: string,
    user_id: string | null,
    goalName: string,
    targetAmount: number,
    currentAmount: number,
    targetDate: Date | string | null,
    created_at: Date | null,
}
const router = Router({mergeParams: true});
//Route to create Saving goals
router.post("/", async(req: Request, res: Response)=>{
    try{
        const { userId, goalName, targetAmount, currentAmount, targetDate, created_at} = req.body;
        const savingGoal = {
            user_id: userId,
            goalName: goalName,
            targetAmount: targetAmount,
            currentAmount:currentAmount,
            targetDate:targetDate,
            created_at: new Date(created_at),
        };
        const result = await db.insert(SavingGoalsTable).values(savingGoal).returning({
            id: SavingGoalsTable.id,    
        }).execute();
        const savingGoalId = result[0]?.id;

        if(!savingGoalId){
            throw new Error("Saving Goal Id did not returned from the database");
        }
        return res.json({message: "Saving goal added successfully", id:savingGoalId});
    }catch(error){
        console.error("error creating Saving goal", error);
        return res.status(503).json({error:"Service Unavailable"});
    }
});
//Route to get Saving goals
router.get("/", async(req: Request, res:Response)=>{
try {
    const savingGoals: SavingGoals[] = await db.select().from(SavingGoalsTable);
    if(savingGoals.length === 0){
        return res.status(404).json({error: "No Saving Goals found"});
    }
    return res.status(200).json(savingGoals);   
}catch(error){
        console.error("error creating Saving goal", error);
        return res.status(503).json({error:"Service Unavailable"});
    }
});
//Route to get all saving goals from an user
router.get("/:userId", async(req: Request, res:Response)=>{
    try{
        const {userId} = req.params;
        const savingGoals: SavingGoals[] = await db.select().from(SavingGoalsTable).where(eq(SavingGoalsTable.user_id, userId));
        
        if(savingGoals.length === 0){
            return res.status(404).json({error: "no Saving Goals found from a user"});
        }
        return res.status(200).json(savingGoals);

    }catch(error){
        console.error("error creating Saving goal", error);
        return res.status(503).json({error:"Service Unavailable"});
    }
});
//Route to update Saving Goals
router.post("/:userId/:savingGoalId", async(req: Request, res:Response) =>{
    try{
        const {savingGoalId, userId } = req.params;
        const { goalName, targetAmount, currentAmount, targetDate} = req.body;

        if(!userId || !savingGoalId){
            return res.status(400).json({message: "Invalid userId or savingGoalId"});
        }
        const updatedSavingGoal = await db.update(SavingGoalsTable).set({
            goalName: goalName,
            targetAmount: targetAmount,
            currentAmount: currentAmount,
            targetDate: targetDate,
        }).where(and(eq(SavingGoalsTable.user_id, userId), eq(SavingGoalsTable.id,savingGoalId))).returning({
            id: SavingGoalsTable.id,
            userId: SavingGoalsTable.user_id,
            goalName: SavingGoalsTable.goalName,
            targetAmount: SavingGoalsTable.targetAmount,
            currentAmount: SavingGoalsTable.currentAmount,
            targetDate: SavingGoalsTable.targetDate,
        });
        if(updatedSavingGoal.length === 0){
            return res.status(404).json({message: "Saving Goal not found"});
        }
        return res.status(200).json({message: "Saving Goal updated successfully", updatedSavingGoal});
    }catch(error){
        console.error("error creating Saving goal", error);
        return res.status(503).json({error:"Service Unavailable"});
    }
});
//Route to delete Saving Goals
router.delete("/:userId/:savingGoalId", async(req: Request, res:Response)=>{
    try{
        const {userId, savingGoalId} = req.params;
        if(!userId || !savingGoalId){
            return res.status(400).json({message: "Invalid user id or Transaction id"});
        }
        await db.delete(SavingGoalsTable).where(and(eq(SavingGoalsTable.id, savingGoalId),eq(SavingGoalsTable.user_id, userId))).execute();

        return res.json({message: "Account delete successfully"});
    }catch(error){
        console.error("error creating Saving goal", error);
        return res.status(503).json({error:"Service Unavailable"});
    }
});

export const SavingGoalsController = router;

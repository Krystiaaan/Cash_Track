import {Router, Request, Response} from "express";
import { db } from "../drizzle/db";
import { ReportsTable } from "../drizzle/schema";
import {eq, and} from "drizzle-orm";

enum reportType {
    IncomeVsExpense = "Income vs. Expenses",
    CategoryBreakdown = "Category Breakdown",
    BudgetReport = "Budget Report",
    BalanceSheet = "Balance Sheet",
}
interface Report{
    id: string,
    user_id: string |null,
    reportType: reportType | "Income vs. Expenses" | "Category Breakdown" | "Budget Report" | "Balance Sheet",
    generatedDate: Date | string | null,
    parameters: Record<string, any> | unknown,
    created_at: Date | null
}

const router = Router({mergeParams: true});
//route to create Report
router.post("/", async(req: Request, res:Response) =>{
    try{
        const {
            userId,
            reportType,
            generatedDate,
            parameters,
            created_at,
        } = req.body;
        const reportData ={
            userId,
            reportType,
            generatedDate,
            parameters,
            created_at: new Date(created_at)
        }

        const result = await db.insert(ReportsTable).values(reportData)
        .returning({id:ReportsTable.id,
        }).execute();
        const reportId = result[0]?.id;
        if(!reportId){
            throw new Error("Report Id not returned from the database");
        }
        return res.json({message: "Report added successfully",id:reportId});
    }catch(error){
        console.error("error Creating Report", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//route to get all Reports
router.get("/", async(req: Request, res:Response) =>{
    try{
        const reports: Report[] = await db.select().from(ReportsTable);

        if(reports.length === 0){
            return res.status(404).json({error: "No Reports found"});
        }
        return res.status(200).json(reports);
    }catch(error){
        console.error("error Creating Report", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
})
//route to get all user Reports
router.get("/:userId", async(req: Request, res:Response) =>{
    try{
        const {userId} = req.params;
        const reports: Report[] = await db.select().from(ReportsTable).where(eq(ReportsTable.user_id,userId));

        if(reports.length === 0){
            return res.status(404).json({error: "No Reports found"});
        }
        return res.status(200).json(reports);
    }catch(error){
        console.error("error Creating Report", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
})

export const ReportController = router;
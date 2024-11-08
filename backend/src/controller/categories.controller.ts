import {Router, Request, Response } from "express";
import { db } from "../drizzle/db";
import { CategoriesTable } from "../drizzle/schema";
import {eq, and} from "drizzle-orm";
enum CategoryType {
    Income = "Income",
    Expense = "Expense",
}
interface Category {
    id: string,
    user_id: string | null,
    categoryName: string,
    categoryType: CategoryType | "Income" | "Expense",
    created_at: Date | null,
}
const router = Router({mergeParams: true});

//get all Categories
router.get("/", async(req: Request, res: Response)=>{
    try {
        const category: Category[] = await db.select().from(CategoriesTable);

        if(category.length === 0){
            return res.status(404).json({error: "No Categories found"});
        }
        return res.status(200).json(category);
    }catch(error){
        console.error("Error fetching Categories", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//get all Categories from user
router.get("/:userId", async(req:Request, res:Response)=>{
    try{
        const {userId} = req.params;
        const category: Category[] = await db.select().from(CategoriesTable)
            .where(eq(CategoriesTable.user_id, userId));
        if(category.length === 0){
                return res.status(404).json({error: "No Categories found"});
            }
        return res.status(200).json(category);
    }catch(error){
        console.error("Error fetching Categories from user", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//route to create new Category
router.post("/", async(req: Request, res:Response)=>{
    try{
        const {userId, categoryName, categoryType, created_at } = req.body;
        const CategoryData = {
            userId,
            categoryName,
            categoryType,
            created_at: created_at ? new Date(created_at) : new Date()
        }
        const result = await db.insert(CategoriesTable).values(CategoryData).returning({
            id: CategoriesTable.id
        }).execute();
        
        const categoryId = result[0]?.id;
        if(!categoryId){
            throw new Error("Transaction Id did not return from the database");
        }
        return res.json({message: "Account added successfully", id: categoryId})
    }catch(error){
        console.error("Error creating new Category", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to update a Category
router.put("/:userId/:categoryId", async(req: Request, res:Response)=>{
    try {
        const {userId, categoryId} = req.params;
        const{ categoryName, categoryType} = req.body;

        if(!userId || !categoryId){
            return res.status(400).json({message: "invalid userId or categoryId"});
        }
        const updatedCategory = await db.update(CategoriesTable).set({
            categoryName: categoryName,
            categoryType: categoryType,
        }).where(and(eq(CategoriesTable.id, categoryId),eq(CategoriesTable.user_id, userId)))
        .returning({
            id: CategoriesTable.id,
            user_id: CategoriesTable.user_id,
            categoryName: CategoriesTable.categoryName,
            categoryType: CategoriesTable.categoryType,
        })
        if(updatedCategory.length ===0){
            return res.status(404).json({message: "Transaction not found"});
        }
        return res.status(200).json({message: "Category updated successfully", updatedCategory});
    }catch(error){
        console.error("Error updating Category", error);
        return res.status(503).json({error: "Service Unavailable"})
    }
});
//Route to delete a category
router.delete(":/userId/:categoryId", async(req:Request, res:Response)=>{
    try{
        const {userId, categoryId} = req.params;
        if(!userId || !categoryId){
            return res.status(400).json({message: "Invalid user id or Transaction Id"});
        }
        await db.delete(CategoriesTable)
            .where(and(eq(CategoriesTable.id,categoryId), eq(CategoriesTable.user_id, userId))).execute();

        return res.json({message: "Account deleted successfuly"})
    }catch(error){
        console.error("Error deleting Category", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
export const CategoriesController = router;
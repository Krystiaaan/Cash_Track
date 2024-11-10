import {Router, Response, Request} from "express";
import { db } from "../drizzle/db";
import { NotificationsTable } from "../drizzle/schema";
import { eq, and} from "drizzle-orm";

enum NotificationType{
    BudgetLimitReached = "Budget Limit Reached",
    UpcomingBillDue = "Upcoming Bill Due",
    PaymentSuccessful = "Payment Successful",
    AccountAlert = "Account Alert",
    ReportReady = "Report Ready",
}
interface Notifcation{
    id:string,
    user_id: string | null,
    notificationType: NotificationType | "Budget Limit Reached" | "Upcoming Bill Due" | "Payment Successful" |"Account Alert" | "Report Ready"
    message: string|null,
    isRead: boolean,
    created_at: Date |null,
}

const router = Router({mergeParams: true});

//Route to create Notification
router.post("/", async(req:Request, res:Response)=>{
    try {
        const {userId, notificationType, message, isRead, created_at} = req.body;

        const notificationData = {
            user_id: userId,
            notificationType,
            message,
            isRead,
            created_at: created_at ? new Date(created_at) : new Date()
        }
        const result = await db.insert(NotificationsTable).values(notificationData).returning({
            id:NotificationsTable.id,
        }).execute();
        const notificationId = result[0]?.id;
        if(!notificationId){
            throw new Error("Notifciation Id not returned from the database");
        }
        return res.json({
            message: "Notification created successfully",
            id:notificationId,
        });
    }catch(error){
        console.error("Error creating Notification", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to get all Notification
router.get("/", async(req:Request, res:Response)=>{
    try{
       const notifications: Notifcation[] = await db.select().from(NotificationsTable);
        if(notifications.length === 0){
            return res.status(404).json({error: "No Notifications found"});
        }
        return res.status(200).json(notifications);
    }catch(error){
        console.error("Error creating Notification", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to get all Notifcation from a user
router.get("/:userId", async(req:Request, res:Response)=>{
    try{
        const {userId} = req.params;
       const notifications: Notifcation[] = await db.select().from(NotificationsTable).where(eq(NotificationsTable.user_id,userId));
        if(notifications.length === 0){
            return res.status(404).json({error: "No Notifications found"});
        }
        return res.status(200).json(notifications);
    }catch(error){
        console.error("Error creating Notification", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});
//Route to delete notification
router.delete("/:userId/:notificationId", async(req:Request,res:Response)=>{
    try{
        const {userId, notificationId} = req.params;
        if(!userId || !notificationId) {
            return res.status(400).json({message: "invalid user id or Notification Id"});
        }
        await db.delete(NotificationsTable).where(and(eq(NotificationsTable.id, notificationId), eq(NotificationsTable.user_id, userId)))
        .execute();

        return res.json({message: "Notification deleted successfully"});
    }catch(error){
        console.error("Error creating Notification", error);
        return res.status(503).json({error: "Service Unavailable"});
    }
});


export const NotificationController= router;
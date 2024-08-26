import  { z} from "zod";

export const RegisterUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    currency: z.string().length(3, "Currency must be a 3-letter code"),
});
export type RegisterUserDTO = z.infer<typeof RegisterUserSchema>;

export const LoginSchema = z.object({
    eMail: z.string().email({
        message: "Invalid email format"
    }),
    password: z.string()
});
export type LoginSchemaDTO = z.infer<typeof LoginSchema>;

export const AccountSchema = z.object({
    user_id: z.string().uuid(),
    accountName: z.string().min(1, "Account name is required"),
    accountType: z.string().min(1, "Account Type is required"),
    balance: z.string().optional()
});
export type AccountSchemaDTO = z.infer<typeof AccountSchema>;

export const TransactionSchema = z.object({
    user_id: z.string().uuid(),
    account_id: z.string().uuid(),
    category_id: z.string().uuid(),
    transactionDate: z.date(),
    amount: z.number().int().min(0,"Amount must be positive"),
    description: z.string().max(255).optional(),
    transactionType: z.enum(["Income", "Expense", "Transfer"]),
});
export type TransactionSchemaDTO = z.infer<typeof TransactionSchema>;

export const CategorySchema = z.object({
    user_id: z.string().uuid(),
    categoryName: z.string().min(1, "Category Name is required"),
    categoryType: z.enum(["Income", "Expense"]),
});
export type CategorySchemaDTO = z.infer<typeof CategorySchema>;

export const BudgetSchema = z.object({
    user_id: z.string().uuid(),
    category_id: z.string().uuid(),
    budgetName: z.string().min(1, "Budget Name is required"),
    amount: z.number().int().min(0,"Amount must be positive"),
    start_date: z.date(),
    end_date: z.date(),
});
export type BudgetSchemaDTO = z.infer<typeof BudgetSchema>;

export const SavingSchema = z.object({
    user_id: z.string().uuid(),
    goalName: z.string().min(1, "Goal name is required").max(255),
    targetAmount: z.number().min(0, "Target amount must be positive"),
    currentAmount: z.number().min(0, "Current amount must be positive"),
    targetDate: z.date(),
});
export type SavingSchemaDTO = z.infer <typeof SavingSchema>;

export const ReportSchema = z.object({
    user_id: z.string().uuid(),
    reportType: z.enum(["Income vs. Expenses", "Category Breakdown", "Budget Report", "Balance Sheet"]),
    generatedDate: z.date(),
    parameters: z.unknown(),
});
export type ReportDTO = z.infer<typeof ReportSchema>;

export const NotificationSchema = z.object({
    user_id: z.string().uuid(),
    notificationType: z.enum(["Budget Limit Reached", "Upcoming Bill Due", "Payment Successful", "Account Alert", "Report Ready"]),
    message: z.string().max(255).optional(),
    isRead: z.boolean(),
});
export type NotificationDTO = z.infer<typeof NotificationSchema>;
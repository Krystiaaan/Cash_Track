import { pgTable, timestamp, uuid, varchar, integer,date, pgEnum, json, boolean} from "drizzle-orm/pg-core"

export const UserTable = pgTable("User", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", {length: 255}).unique().notNull(),
    email: varchar("email", {length:255}).unique().notNull(),
    passwordHash: varchar("passwordHash", {length:255}).unique().notNull(),
    currency: varchar("currency", {length:255}).notNull(),
    created_at:timestamp("created_at").notNull().defaultNow()
});
export const AccountsTable = pgTable("Accounts", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => UserTable.id),
    accountName: varchar("accountName", {length:255}).notNull(),
    accountType: varchar("accountType", {length:255}).notNull(),
    balance: integer("balance"),
    created_at:timestamp("created_at").notNull().defaultNow()
});
export const transactionEnum = pgEnum("TransactionType", ["Income", "Expense", "Transfer"]);

export const TransactionsTable = pgTable("Transactions", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => UserTable.id),
    account_id: uuid("account_id").references(() => AccountsTable.id),
    category_id: uuid("category_id").references(() => CategoriesTable.id),
    transactionDate: date("transactionDate").notNull(),
    amount: integer("amount").notNull(),
    description: varchar("description",{length:255}),
    transactionType: transactionEnum("transactionType").notNull().default("Income").notNull(),
    created_at:timestamp("created_at").notNull().defaultNow()
});
export const CategoryEnum = pgEnum("CategoryType", ["Income", "Expense"])

export const CategoriesTable = pgTable("Categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => UserTable.id),
    categoryName: varchar("categoryName", {length:255}).notNull(),
    categoryType: CategoryEnum("categoryType").notNull().default("Income").notNull(),
    created_at:timestamp("created_at").notNull().defaultNow()
});
export const BudgetTable = pgTable("Budget",{
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => UserTable.id),
    category_id: uuid("category_id").references(() => CategoriesTable.id),
    budgetName: varchar("budgetName", {length:255}).notNull(),
    amount: integer("amount").notNull(),
    start_date: date("start_date").notNull(),
    end_date: date("end_date").notNull(),
    created_at:timestamp("created_at").notNull().defaultNow()
});
export const SavingGoalsTable = pgTable("SavingGoals", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => UserTable.id),
    goalName: varchar("goalName", {length:255}).notNull(),
    targetAmount: integer("targetAmount").notNull(),
    currentAmount: integer("currentAmount").notNull(),
    targetDate: date("targetDate").notNull(),
    created_at:timestamp("created_at").notNull().defaultNow()
});
export const reportEnum = pgEnum("reportType", [
    "Income vs. Expenses",
    "Category Breakdown",
    "Budget Report",
    "Balance Sheet"
    ])

export const ReportsTable = pgTable("Reports", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => UserTable.id),
    reportType: reportEnum("reportType").notNull(),
    generatedDate: date("generatedDate").notNull().defaultNow(),
    parameters: json("parameters").notNull(),
    created_at:timestamp("created_at").notNull().defaultNow()
});
export const notificationEnum = pgEnum("notificationType", [
    "Budget Limit Reached",
    "Upcoming Bill Due",
    "Payment Successful",
    "Account Alert",
    "Report Ready"
]);

export const NotificationsTable = pgTable("Notifications", {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").references(() => UserTable.id),
    notificationType:notificationEnum("notificationType").notNull(),
    message: varchar("message", {length:255}),
    isRead: boolean("isRead").notNull().default(false),
    created_at:timestamp("created_at").notNull().defaultNow()
});

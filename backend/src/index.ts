import "dotenv/config";
import express from "express";
import cors from "cors";
import { AuthController } from "./controller/auth.controller";
import { UserController } from "./controller/user.controller";
import { AccountController }from "./controller/account.controller";
import { TransactionController } from "./controller/transaction.controller";
import { CategoriesController } from "./controller/categories.controller";
import { BudgetController } from "./controller/budget.controller";
import { SavingGoalsController } from "./controller/savingGoal.controller";
import { ReportController } from "./controller/report.controller";
import { Auth } from "./middleware/auth.middleware";
import path from "path"
import http from "http";
import { NotificationController } from "./controller/notification.controller";

const PORT = 3000;
const app = express();

export const DI = {} as {
  server: http.Server;
};

export const initializeServer = async () => {
  app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  }));

  app.use(express.json());
  app.use(Auth.prepareAuthentication);


  app.use("/auth",AuthController);
  app.use("/users", Auth.verifyAccess, UserController);
  app.use("/accounts", Auth.verifyAccess, AccountController);
  app.use("/transactions", Auth.verifyAccess, TransactionController);
  app.use("/categories", Auth.verifyAccess, CategoriesController);
  app.use("/budget",Auth.verifyAccess, BudgetController);
  app.use("/savinggoals", Auth.verifyAccess, SavingGoalsController);
  app.use("/reports",Auth.verifyAccess,ReportController);
  app.use("/notifications", Auth.verifyAccess, NotificationController);


  DI.server= app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

};
export const closeServer = async () => {
  DI.server.close();
};

if(process.env.environment !== "test"){
  initializeServer();
}

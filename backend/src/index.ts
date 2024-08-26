import "dotenv/config";
import express from "express";
import { AuthController } from "./controller/auth.controller";
import { UserController } from "./controller/user.controller";
import { Auth } from "./middleware/auth.middleware";
import path from "path"
import http from "http";

const PORT = 3000;
const app = express();

export const DI = {} as {
  server: http.Server;
};

export const initializeServer = async () => {

  app.use(express.json());
  app.use(Auth.prepareAuthentication);


  app.use("/auth",AuthController);
  app.use("/users", Auth.verifyAccess, UserController);

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

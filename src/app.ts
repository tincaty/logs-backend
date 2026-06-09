// module for application initialization
import express from "express";
import cors from "cors";
import { connection } from "./database/database";
import { router as userRouter } from "./controller/userController";
import { router as incidentRouter } from "./controller/incidentsController";
import { router as commentRouter } from "./controller/commentController";
import { createUser } from "./service/userService";
import { router as logRouter } from "./controller/logcontroller";

const app = express();
// configure default middleware
app.use(cors());
app.disable("x-powered-by");

app.use(express.json());

app.use(express.urlencoded({ extended: true, parameterLimit: 2 }));
//establish database connection
(async () => {
  await connection();
  //await createUser();
})();
// usercontroller
app.use("/api", userRouter);
// incident
app.use("/api", incidentRouter);

// comment
app.use("/api", commentRouter);
// logs
app.use("/api", logRouter);
export { app };

import { Router } from "express";
import { registerController } from "../controller/user.controller.js";

const userRouter = Router();

userRouter.post("/register", registerController);

export { userRouter };

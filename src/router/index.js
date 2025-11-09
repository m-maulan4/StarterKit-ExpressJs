import express from "express";
import authRouter from "../features/auth/authRouter.js";
import userRouter from "../features/user/userRouter.js";

export const getRouter = express();
getRouter.use(authRouter);
getRouter.use(userRouter);

import { Router } from "express";
import * as user from "./userController.js";
import middle from "../../common/middleware/middle.js";
const userRouter = Router();
userRouter.get("/user", middle, user.getUsers);
export default userRouter;

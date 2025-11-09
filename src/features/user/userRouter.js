import { Router } from "express";
import { getUsers } from "../controllers/usersController.js";
import middle from "../middleware/middle.js";
const userRouter = Router();
userRouter.get("/", middle, getUsers);
export default userRouter;

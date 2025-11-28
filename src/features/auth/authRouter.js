import { Router } from "express";
import * as auth from "./authController.js";

const authRouter = Router();
authRouter.post("/auth/registertion", auth.authRegis);
authRouter.post("/auth/login", auth.authLogin);
authRouter.post("/auth/logout", auth.authLogout);
authRouter.get("/auth/newtoken", auth.authToken);
authRouter.get("/me", auth.me);

export default authRouter;

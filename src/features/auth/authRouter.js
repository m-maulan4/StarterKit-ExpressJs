import { Router } from "express";
import * as auth from "./authController.js";

const authRouter = Router();
authRouter.post("/registertion", auth.authRegis);
authRouter.post("/login", auth.authLogin);
authRouter.get("/logout", auth.authLogout);
authRouter.get("/me", auth.me);

export default authRouter;

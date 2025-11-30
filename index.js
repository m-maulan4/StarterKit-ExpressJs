import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// Router
import userRouter from "./src/features/user/userRouter.js";
import authRouter from "./src/features/auth/authRouter.js";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use("/auth", authRouter);
app.use("/user/", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

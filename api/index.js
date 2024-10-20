import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to DB!");
  })
  .catch((error) => {
    console.log("error", error);
  });
const app = express();
app.listen(3000, () => {
  console.log("server is running on 3000!!");
});

app.use("/api/user", userRouter);

import mongoose from "mongoose";

export const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to DB!");
    })
    .catch((error) => {
      console.log("error", error);
    });
};

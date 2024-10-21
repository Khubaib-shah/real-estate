import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      Type: String,
      required: true,
      unique: true,
    },
    email: {
      Type: String,
      required: true,
      unique: true,
    },
    password: {
      Type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;

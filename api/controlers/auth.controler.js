import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPashword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPashword });
  try {
    await newUser.save();
    res.status(201).json("user created succesfully");
  } catch (error) {
    next(error)
    // next(errorHandler(550 , "Error from the function"));
  }
};

export default signup;

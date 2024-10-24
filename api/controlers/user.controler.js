import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ massage: "api route is working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {}
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    req.clearcookie("access_token", { httpOnly: true });

    res.status(200).json("User has been deleted", {
      httpOnly: true,
      path: "/",
    });
  } catch (error) {
    next(error.message);
  }
};

export const signOut = async (req, res, next) => {
  try {
    req.clearCookie("access_token", {
      httpOnly: true,
      path: "/",
    });

    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error.message);
  }
};

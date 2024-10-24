import express from "express";
import { signup, signin, google } from "../controlers/auth.controler.js";
import { signOut } from "../controlers/user.controler.js";
const route = express.Router();
route.post("/signup", signup);
route.post("/signin", signin);
route.post("/google", google);
route.post("/signout", signOut);
export default route;

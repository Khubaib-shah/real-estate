import express from "express";
import { createListing } from "../controlers/listing.controler.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, createListing);
export default router;

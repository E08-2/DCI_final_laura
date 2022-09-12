import express from "express";
import {  deleteUserAccount, getUserById,verifyUser } from "../controllers/usersController.js";

const router = express.Router();


router.get("/:id", getUserById); 

router.post("/verifytoken", verifyUser);

router.delete("/:id", deleteUserAccount);



export default router;
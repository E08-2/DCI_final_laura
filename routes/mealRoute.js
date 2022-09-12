import express from "express";
import { mealGet } from "../controllers/mealsController.js";

const router = express.Router();

router.get("/", mealGet);

// router.post("/", mealPost);

export default router;


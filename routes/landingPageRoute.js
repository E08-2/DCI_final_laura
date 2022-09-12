import express from "express";
import getFeaturedMeals from "../controllers/landingpageController.js";


const router = express.Router();

router.get("/meals/featured", getFeaturedMeals);

export default router;
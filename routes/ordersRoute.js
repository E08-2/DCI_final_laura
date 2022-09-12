import express from "express";
import { deleteSingleOrderedMeal, orderPost } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", orderPost);

router.delete("/:orderId/meals/:id", deleteSingleOrderedMeal);

export default router;
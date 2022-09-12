import express from "express";
import { totalCustomerCount, totalNumberOfOrders, countOrderPerUser } from "../controllers/adminController.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.use(admin);

router.get("/:id/count", totalCustomerCount);

router.get("/:id/count", totalNumberOfOrders);

router.get("/:id/count", countOrderPerUser);

export default router;
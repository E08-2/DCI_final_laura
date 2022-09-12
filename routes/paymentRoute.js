import express from "express";
import { paymentPost } from "../controllers/paymentController.js";
// import requiredValues from "../controllers/requiredValues.js";
// import checkValidation from "../validators/checkValidation.js";
// import paymentValidator from "../validators/paymentValidator.js";

const router = express.Router();

router.post("/", paymentPost);

//router.post("/", requiredValues(["creditNumber", "securityCode", "expirationMonth", "expirationYear"]), paymentValidator(), checkValidation, paymentPost);
export default router;
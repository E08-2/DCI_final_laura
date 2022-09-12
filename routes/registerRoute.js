import express from "express";
import {registerController} from "../controllers/registerController.js";
import checkValidation from "../validators/checkValidation.js";
import registerValidator from "../validators/registerValidator.js";
import requiredValues from "../validators/requiredValues.js";


const router = express.Router();

router.post("/", requiredValues(["firstName", "lastName", "password", "phone", "street", "houseNo", "zipCode", "city"]), registerValidator(), checkValidation, registerController);

export default router;
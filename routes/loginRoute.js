import express from "express";
import {loginController} from "../controllers/loginController.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";

const router = express.Router();

router.post("/",  requiredValues(["email", "password"]),checkValidation, loginController);

export default router;
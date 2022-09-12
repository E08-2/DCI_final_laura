import { check } from "express-validator";

const registerValidator = () => {

    return [
        check("firstName")
            .trim().escape().isLength({ min: 2, max: 10 })
            .withMessage("First name must be between 2 and 10 characters"),

        check("lastName")
            .trim().escape().isLength({ min: 2, max: 10 })
            .withMessage("Last name must be between 2 and 10 characters"),
        
        check("email")
            .normalizeEmail().isEmail()
            .withMessage("Email is not valid"),
        
        check("password")
            .isStrongPassword()
            .withMessage("Password must be at least 8 characters long and contain at least one number and one uppercase letter"),

        check("confirmPassword")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }

                return true;
            })
    ]
};

export default registerValidator;
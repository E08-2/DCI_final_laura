import { check } from "express-validator";

const paymentValidator = () => {
    
        return [
            check("paymentMethod")
                .isIn(["Visa", "MasterCard", "American Express", "Discover"])
                .withMessage("Payment method must be Visa, MasterCard, American Express or Discover"),
            
            check("cardNumber")
                .isCreditCard()
                .withMessage("Card number is not valid"),
            
            check("cardExpiry")
                .isISO8601()
                .withMessage("Card expiry is not valid"),
            
            check("cardCVC")
                .isNumeric()
                .withMessage("Card CVC is not valid")
        ]
};

export default paymentValidator;
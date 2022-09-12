import { check } from "express-validator";

const mealValidator = () => {
    
        return [
            
            check("category")
                .trim().escape().isLength({ min: 2, max: 30 })
                .withMessage("Category must be between 2 and 30 characters"),

            check("amount")
                .isNumeric(),
            
            check("orderedMeal")
                .custom((value) => {
                    if(value.length !==3){
                        throw new Error("Must order at least three meals");
                      }
                      return true;
                }),
            ]
};

export default mealValidator;
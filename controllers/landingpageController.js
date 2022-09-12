import Meal from "../models/meal.js";
import createError from "http-errors";


const getFeaturedMeals = async (req, res, next) => {
    try{
        const featuredMeals = await Meal.find({rating:5 }).limit(3);

        return res.json({featured: featuredMeals});
    }catch(err){
        console.log(err);
        return next(createError(500, "Meals could not be queried!"))
    }
}

export default getFeaturedMeals;
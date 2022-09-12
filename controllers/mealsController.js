import Meal from "../models/meal.js";
import createError from "http-errors";

//=====================================
//GET route - get all meals from database & display on meals page
//=====================================

export const mealGet = async (req, res, next) => {
  let foundMeals;
  try {
    foundMeals = await Meal.find();
  } catch {
    return next(createError(500, "Database could not get meals. Please try again"));
  }
  // res.send(foundMeals)
  res.status(201).json(foundMeals);
};

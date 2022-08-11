import mongoose from "mongoose";

const { Schema } = mongoose;

const mealSchema = new Schema({
    meal: {type: String, required: true}, // would be good to call it mealName
    img: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 3},
    rating: {type: Number, required: true, min: 3},
}, {timestamps: true});

const Meal = mongoose.model("meals", mealSchema);

export default Meal;
import mongoose from "mongoose";

const { Schema } = mongoose;

const mealSchema = new Schema({
    mealName: {type: String, required: true}, 
    img: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 3},
    rating: {type: Number, required: true, min: 0},
}, {timestamps: true});

const Meal = mongoose.model("meals", mealSchema);

export default Meal;
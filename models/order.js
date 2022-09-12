import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    meals: [{ type: mongoose.Types.ObjectId, ref: "meals" }],
    deliveryAddress:{},
    totalPrice: { type: Number, required: true }
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);

export default Order;



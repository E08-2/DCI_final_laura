import createError from "http-errors";
import User from "../models/user.js";
import Order from "../models/order.js";

//==================================
// Total number of customers
//==================================

export const totalCustomerCount = async (req, res, next) => {
        let numberOfDocuments;
      try {
        numberOfDocuments = await User.countDocuments({});
    } catch {
        return next(createError(500, "Database could not be queried. Please try again"));
    }

    res.json({ count: numberOfDocuments });
};

//==================================
// Total number of orders
//==================================
export const totalNumberOfOrders = async (req, res, next) => {
    let numberOfDocuments;
  try {
    numberOfDocuments = await Order.countDocuments({});
} catch {
    return next(createError(500, "Database could not be queried. Please try again"));
}

res.json({ count: numberOfDocuments });
};

//==================================
// Total number of orders per customer
//==================================

export const countOrderPerUser = async (req, res, next) => {
    const userId = req.params.id;

    let numberOfDocuments;
    try {
        const user = await User.findById(userId)
        numberOfDocuments = user.orders.length;
    } catch {
        return next(createError(500, "Database could not be queried. Please try again"));
    }

    res.json({ count: numberOfDocuments });
};
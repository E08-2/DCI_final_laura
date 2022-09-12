import User from "../models/user.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";

const admin = async (req, res, next) => {
    let token;

    try {
        token = req.headers.authorization.split(" ")[1];
        if (!token) {
           throw new Error("User unauthorized"); 
        }
        // Decode the token sent from the frontend
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        let currentUser;
        try {
            currentUser = await User.findById(decodedToken.id)
        } catch {
            return next(createError(500, "Couldn't query the database. Please try again"));
        }

        if (currentUser && currentUser.isAdmin) {
            next();
        } else {
            throw new Error("User unauthorized");
        }
    } catch {
        next(createError(403, "User could not be authorized. Please try again"));
    }
}

export default admin;
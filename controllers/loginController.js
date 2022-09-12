import User from "../models/user.js";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginController = async ( req, res, next ) =>
{
    // Take the username and password the user tried to log in with
    const { email, password } = req.body;
    let foundUser;
    try
    {
        foundUser = await User.findOne( { email: email } );
    } catch {
        return next( createError( 500, "could not query database. Please try again!" ) );
    }
    if ( foundUser )
    {
        // Check if the password the user entered matches the one in the database
        let isPasswordCorrect;
        try
        {
            console.log(password, foundUser.password)
            isPasswordCorrect = await bcrypt.compare( password, foundUser.password );
        } catch {
            return next( createError( 500, "could not compare passwords. Please try again!" ) );
        }
        // If the password is not correct, return an error
        if ( !isPasswordCorrect )
        {
            return next( createError( 401, "The password you entered is incorrect" ) );
        };
        // Generate a token for the user that is valid for 1 hour.
        let newToken;
        try
        {
            newToken = jwt.sign( { id: foundUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" } );
        } catch {
            return next( createError( 500, "could not generate token. Please try again!" ) );
        }
        // If the password is correct and the token is valid, return the user id and the user's token
       return res.json( { id: foundUser._id, token: newToken, data:foundUser } );
    } else
    {
        return next( createError( 401, "User not found. Please register" ) );
    }
};


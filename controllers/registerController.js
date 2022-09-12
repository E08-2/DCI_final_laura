import User from "../models/user.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";


export const registerController = async ( req, res, next ) =>
{
    const { firstName, lastName, email, password, phone, street, houseNo, zipCode, city } = req.body;
    let foundUser;
    try
    {
        foundUser = await User.findOne( { email: email } );
    } catch {
        return next( createError( 500, "could not query database. please try again." ) );
    }
    // if the user already exists, return an error
    if ( foundUser ){
        return next( createError( 400, "user already exists. Please try a different username" ) );
    }
    // If there is no customer in the collections with the username received from the frontend
    if ( !foundUser )
    {
        // Create a new user based on data received from req.body
        const newUser = new User( {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone,
            street: street,
            houseNo: houseNo,
            zipCode: zipCode,
            city: city,
            isAdmin: false,
            orders:[]
        } );
        // Save the new user to the database
        try
        {
            await newUser.save();
        } catch {
            return next( createError( 500, "couldn't create user. please try again!" ) );
        }
        
        // Create a token that is valid for one hour for the new registered user
        let newToken;
        try{
            newToken = jwt.sign( { id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" } );
        }catch{
            return next( createError( 500, "could not generate token. please try again!" ) );
        }
        // Return the new user's id and the new token
     return res.json({ id: newUser._id, token: newToken });
        
    }
};
export default registerController;



import User from "../models/user.js";
import createError from "http-errors";
import jwt from "jsonwebtoken"

//=============================================================
// GET user by ID
// =============================================================
export const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    // user found?
    let foundUser;
    try{
        foundUser = await User.findById(userId);
        if (foundUser===null){
            return next(createError(500, "User with that ID could not be found. Please try again!"));
        } else {
            return res.status(200).json({
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                street: foundUser.street,
                houseNo: foundUser.houseNo,
                city: foundUser.city,
                zipCode: foundUser.zipCode
            })
        }
    }catch{
        return next(createError(500, "User could not be queried. Please try again!"));
    }

}

//=============================================================
//  Verify Log in User in the Front End once logged in
// =============================================================

export const verifyUser=async(req,res,next)=>{
    try{
        const token =req.headers.token;
  const decode = jwt.verify(token,process.env.SECRET_KEY)
  console.log(decode);
  if(decode){
let user = await User.findById(decode.id)
res.send({
    success:true,
     data:user,
     token:token
    })
  }
    }catch(err){
res.send({success:false, message:err.message})
    }
}

//=============================================================
// Delete User Account
// =============================================================

export const deleteUserAccount = async (req, res, next) => {

    const userId = req.params.id;
  
    try {
      await User.findByIdAndRemove(userId);
    } catch {
      return next(createError(500, "User could not be deleted. Please try again"));
    }
  
    // find user using id and delete 
  
    res.json({ message: `The account has been successfully deleted. Come back soon!` });
  };





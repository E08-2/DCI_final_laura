import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema( {

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    houseNo: { type: Number, required: true },
    zipCode: { type: String, required: true },
    city:{ type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    orders: [ { type: mongoose.Types.ObjectId, ref: "orders" } ]
    
}, { timestamps: true } );

userSchema.pre("save", async function(next) {
    
    try {
        if (!this.isModified("password")) return next();
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model( "users", userSchema );

export default User;

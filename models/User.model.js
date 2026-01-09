import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

//create userSchema 
const userSchema = new mongoose.Schema({
userName:{
    "type" : String,
    "required" : true,
    "trim" : true
},
email:{
    "type": String,
    "required": true,
    "unique": true,
    "lowercase":true
},
password:{
    "type": String,
    "required": true,
    "minlength": 6
},
avatar:{
    "type" : String,
    default : ""
}
},
{timestamps : true}
)

//runs before saving user on database
userSchema.pre("save", async function (next) {
    //if password not change--don't hash again
    if (!this.isModified("password")) {
        return next()
    }
     //convert password with unreadable hash
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

 //add compare password method for login
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword ,this.password )
}

const User = mongoose.model("User" , userSchema)
export default User;
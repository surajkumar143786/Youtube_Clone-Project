import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";

//registeration logic
async function registerUser(req,res){
 try{
    //mandatory stuff
    const {userName , email , password} = req.body
    if(!userName || !email || !password){
        return res.status(400).json({message : "all fields are required"})
    }

    // check if user already exists
    const existingUser = await User.findOne({email})
     if (existingUser){
        return res.status(400).json({message : "user already exists with this email"})
     }

  //create new user
  const newUser = new User({
    userName,
    email,
    password
  })
  await newUser.save()
//send response 
return res.status(201).json({message : "user registered successfully"})

//server error
 }catch(err){
    return res.status(500).json({message : "server error while registration" , err : err.message}) }
}

//login logic
async function userLogin(req,res){
    try{
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: " email and password are required" })
        }
        //find user
        const findUser = await User.findOne({ email })
        if (!findUser) {
            return res.status(400).json({ message: "invalid email or password" })
        }

        //compare password
        const isMatch = await findUser.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message : "invalid email or password"})
        }
    //generate token 
        const token =generateToken(findUser._id)
        return res.status(200).json({ message: "logic successfully" , token, findUser : {
            id : findUser._id ,
            userName : findUser.userName,
            password : findUser.email
        }
        })


    }
    catch(err){
        return res.status(500).json({ message: "server error while logging", err: err.message, })
    }

}


export {registerUser,userLogin};
import User from "../models/User.model.js";

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
export default registerUser;
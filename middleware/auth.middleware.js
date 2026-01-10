import jwt from 'jsonwebtoken';
import User from '../models/User.model';

async function protect(req,res,next){
    try{
          let token;
        //check if authorization header exists
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
            // Format: "Bearer token_here"
          token = req.headers.authorization.split(" ")[1]
        }
         
        //if no token found
        if(!token){
            return res.status(404).json({ message: "Not authorized -- token missing" })
        }

        //verify token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find user from decoded token id
        req.user = await User.findById(decoded.id).select("-password") //exclude password--never expose password
       //move to next middleware 
       next()

    }catch(err){
        return res.status(401).json({message : "not authorized -- invalid token!!"})
    }
}

export default protect;
import {registerUser, userLogin} from "../controllers/auth.controller.js";
import express from 'express'


//register route
const registerRouter = express.Router();
registerRouter.post('/register',registerUser)

//login route
const loginRouter = express.Router()
loginRouter.post('/login', userLogin)

export  {registerRouter , loginRouter};
import {registerUser, userLogin} from "../controllers/auth.controller.js";
import express from 'express'

const authRouter = express.Router();

//register route
authRouter.post('/register',registerUser)

//login route
authRouter.post('/login', userLogin)

export default authRouter;
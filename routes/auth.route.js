import registerUser from "../controllers/auth.controller.js";
import express from 'express'


//create register route
const registerRouter = express.Router();
registerRouter.post('/register',registerUser)

export default registerRouter;
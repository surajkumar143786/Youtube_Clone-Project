import express from 'express'
import {addVideo, getVideo} from '../controllers/video.controller.js';
import protect from '../middleware/auth.middleware.js';


const videoRouter = express.Router();

//route for addVideo
videoRouter.post('/',protect,addVideo)

//route for getVideo
videoRouter.get('/',getVideo)

export default videoRouter
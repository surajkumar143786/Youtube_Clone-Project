import express from 'express'
import {addVideo, getSingleVideo, getVideo} from '../controllers/video.controller.js';
import protect from '../middleware/auth.middleware.js';


const videoRouter = express.Router();

//route for addVideo
videoRouter.post('/',protect,addVideo)

//route for getVideo
videoRouter.get('/',getVideo)

//route for get SingleVideo
videoRouter.get("/:id", getSingleVideo);

export default videoRouter
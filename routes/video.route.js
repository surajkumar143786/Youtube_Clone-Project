import express from 'express'
import {addVideo, getVideo} from '../controllers/video.controller.js';
import protect from '../middleware/auth.middleware.js';

//route for addVideo
const addVideoRouter = express.Router();
addVideoRouter.post('/videos',protect,addVideo)

//route for getVideo
const getVideoRouter = express.Router()
getVideoRouter.get('/getvideo',getVideo)

export  {addVideoRouter,getVideoRouter};
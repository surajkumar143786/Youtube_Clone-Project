import express from 'express'
import addVideo from '../controllers/video.controller.js';
import protect from '../middleware/auth.middleware.js';

const addVideoRouter = express.Router();
addVideoRouter.post('/videos',protect,addVideo)

export default addVideoRouter;
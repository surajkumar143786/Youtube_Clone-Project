import express from 'express';
import channelCreate from '../controllers/channel.controller.js';
import protect from '../middleware/auth.middleware.js';

const channelCreateRouter = express.Router()
channelCreateRouter.post('/create/channel',protect,channelCreate)

export default channelCreateRouter;
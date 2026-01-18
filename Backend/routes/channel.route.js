import express from "express";
import protect from "../middleware/auth.middleware.js";
import channelController from "../controllers/channel.controller.js";

const router = express.Router();

/*
  POST /api/channels
  Create channel
*/
router.post("/", protect, channelController.channelCreate);

/*
  GET /api/channels/my
  Get logged-in user's channel + videos
*/
router.get("/my", protect, channelController.getMyChannel);

export default router;

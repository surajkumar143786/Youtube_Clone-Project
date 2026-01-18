import Channel from "../models/Channel.model.js";
import Video from "../models/Video.model.js";

/*
  CREATE CHANNEL
  POST /api/channels
*/
async function channelCreate(req, res) {
    try {
        const { channelName, description } = req.body;

        // validation
        if (!channelName) {
            return res.status(400).json({
                message: "channelName is required",
            });
        }

        // one user = one channel
        const channelExists = await Channel.findOne({
            owner: req.user._id,
        });

        if (channelExists) {
            return res.status(400).json({
                message: "user already has a channel",
            });
        }

        const newChannel = new Channel({
            channelName,
            description,
            owner: req.user._id,
        });

        await newChannel.save();

        res.status(201).json({
            message: "channel successfully created",
            channel: newChannel,
        });
    } catch (err) {
        res.status(500).json({
            message: "server error while creating channel",
            error: err.message,
        });
    }
}

/*
  GET LOGGED-IN USER CHANNEL + VIDEOS
  GET /api/channels/my
*/
async function getMyChannel(req, res) {
    try {
        const channel = await Channel.findOne({
            owner: req.user._id,
        });

        if (!channel) {
            return res.status(404).json({
                message: "Channel not found",
            });
        }

        const videos = await Video.find({
            channel: channel._id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            channel,
            videos,
        });
    } catch (err) {
        res.status(500).json({
            message: "server error while fetching channel",
            error: err.message,
        });
    }
}

/*
  DEFAULT EXPORT (OBJECT STYLE)
*/
export default {
    channelCreate,
    getMyChannel,
};

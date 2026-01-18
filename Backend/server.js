import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRouter from "./routes/auth.route.js";
import channelRouter from "./routes/channel.route.js";
import videoRouter from "./routes/video.route.js";
import commentRouter from "./routes/comment.route.js";

dotenv.config();

const app = express();

// Connect database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("YouTube Clone Backend is running");
});

// Test route (optional, keep if you want)
app.post("/test-body", (req, res) => {
    console.log("TEST BODY 👉", req.body);
    res.json(req.body);
});

// Auth routes
app.use("/api/auth", authRouter);

// Channel routes
app.use("/api/channels", channelRouter);

// Video routes
app.use("/api/videos", videoRouter);

// Comment routes
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT: ${PORT}`);
});

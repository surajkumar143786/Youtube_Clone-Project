import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import './config/env.js'
import channelCreateRouter from './routes/channel.route.js';
import videoRouter from './routes/video.route.js';
import commentRouter from './routes/comment.route.js';
import authRouter from './routes/auth.route.js';


dotenv.config();

const app = express();

//connected database
connectDB()

//middleware
app.use(cors())
app.use(express.json())

//test api
app.post("/test-body", (req, res) => {
    console.log("TEST BODY 👉", req.body);
    res.json(req.body);
});

//auth (register and login)
app.use('/api/auth',authRouter)

//create channel
app.use('/api/channels',channelCreateRouter)

//getVideo &//add video
app.use('/api/videos',videoRouter)

//comment router
app.use('/api/comments',commentRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT:${PORT}`)
})

//root route
app.get('/',(req,res)=>{
    res.send("YouTube Clone Backend is running")
})
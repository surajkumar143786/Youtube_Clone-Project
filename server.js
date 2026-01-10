import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import {loginRouter, registerRouter} from './routes/auth.route.js';
import './config/env.js'
import channelCreateRouter from './routes/channel.route.js';
import addVideoRouter from './routes/video.route.js';




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

//register
app.use('/api',registerRouter)

//login
app.use('/api',loginRouter)

//create channel
app.use('/api',channelCreateRouter)

//addVideo
app.use('/api',addVideoRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT:${PORT}`)
})

//root route
app.get('/',(req,res)=>{
    res.send("YouTube Clone Backend is running")
})
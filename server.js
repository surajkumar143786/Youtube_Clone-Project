import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';

dotenv.config();

const app = express();

//connected database
connectDB()

//middleware
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT:${PORT}`)
})

//root route
app.get('/',(req,res)=>{
    res.send("YouTube Clone Backend is running")
})
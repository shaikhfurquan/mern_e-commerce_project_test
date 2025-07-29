import app from './app.js'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'



dotenv.config()


connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server started at ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log("Failed to connect database", error);
})

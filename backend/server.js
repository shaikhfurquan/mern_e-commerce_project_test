import app from './app.js'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'



dotenv.config()
connectDB()


// handeling the promise rejection errors , shutting down server
const server = app.listen(process.env.PORT, () => {
    console.log(`server started at ${process.env.PORT}`);
})

process.on('unhandledRejection', (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Server is shutting down, due to unhandle promise rejection`);

    // closing the server and exit the process.
    server.close(() => {
        process.exit(1)
    })
})


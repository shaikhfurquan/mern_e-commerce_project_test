import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import productRouter from './routes/product.route.js'
import { errorHandleMiddleware } from './middlewares/error.middleware.js'
import userRouter from './routes/user.route.js'

const app = express()

//express-middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())


//routes
app.use('/api/v1/products', productRouter)
app.use('/api/v1/user', userRouter)


// error middleware
app.use(errorHandleMiddleware)


export default app


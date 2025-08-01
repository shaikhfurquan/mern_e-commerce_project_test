import { handleAsyncError } from "../middlewares/handleAsyncError.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
import ApiFunctionality from "../utils/api.functionality.js";
import HandleError from "../utils/handleError.js";
import { sendJwtToken } from "../utils/sendJwtToken.js";


export const registerUser = handleAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body
    const user = await UserModel.create({
        name,
        email,
        password,
        avatar: {
            public_id: "temp cloud id",
            url: "temp cloud url",
        }
    })
    sendJwtToken(user, 201, res)
})


export const loginUser = handleAsyncError(async (req, res, next) => {

    const { email, password } = req.body
    if (!email || !password) {
        return next(new HandleError("Email or password cannot be empty", 400))
    }
    const user = await UserModel.findOne({ email }).select('+password')
    if (!user) {
        return next(new HandleError("Invalid Email or password.", 401))
    }

    const isPasswordValid = await user.verifyPassword(password)
    if (!isPasswordValid) {
        return next(new HandleError("Invalid Credentials.", 401))
    }

    sendJwtToken(user, 200, res)
})
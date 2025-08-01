import { handleAsyncError } from "../middlewares/handleAsyncError.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
import ApiFunctionality from "../utils/api.functionality.js";
import HandleError from "../utils/handleError.js";


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
    res.status(201).json({
        success: true,
        user
    });
})
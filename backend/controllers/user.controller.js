import { handleAsyncError } from "../middlewares/handleAsyncError.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
import HandleError from "../utils/handleError.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendJwtToken } from "../utils/sendJwtToken.js";
import crypto from 'crypto'


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


export const logoutUser = handleAsyncError(async (req, res, next) => {

    const options = {
        expires: new Date(Date.now()),
        httpOnly: true
    }
    res.cookie('token', null, options).json({
        success: true,
        message: "User logout successfully."
    })
})


export const requestPasswordReset = handleAsyncError(async (req, res, next) => {

    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
        return next(new HandleError("User doesn't exists", 400))
    }
    let resetToken;
    try {
        resetToken = user.generatePasswordResetToken()
        await user.save({ validateBeforeSave: false })
    } catch (error) {
        return next(new HandleError("Could not save reset token please try again later", 500))
    }

    const resetPasswordUrl = `http://localhost/api/v1/reset/${resetToken}`
    // const message = `Use the following link to reset your password : ${resetPasswordUrl}. \n\n . This link will expire in 30 minutes. \n\n If you didn't request a password reset, Please ingore this message`

    const message = `
        <p>🔐 Use the following link to reset your password:</p>
        <p><a href="${resetPasswordUrl}">${resetPasswordUrl}</a></p>
        <p>⏳ <strong>This link will expire in 30 minutes.</strong></p>
        <p>❗If you didn't request a password reset, please ignore this message.</p>
        `;


    // sending the email
    await sendEmail({
        email: user.email,
        subject: `Password Reset Request`,
        message
    })
    res.status(200).json({
        success: true,
        message: `Email is sent to ${user.email} successfully`
    })
    try {

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false })
        return next(new HandleError("Email Could not send. please try again later", 500))
    }
})


export const resetPassword = handleAsyncError(async (req, res, next) => {

    const { token } = req.params
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
    // console.log(resetPasswordToken);

    const user = await UserModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new HandleError('Reset password token is invalid or has been expired.', 400));
    }

    const { password, confirmPassword } = req.body
    if (password !== confirmPassword) {
        return next(new HandleError('Password and confirm password does not match', 400))
    }

    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save({ validateBeforeSave: false })
    sendJwtToken(user, 200, res)
})


export const getUserProfileDetails = handleAsyncError(async (req, res, next) => {

    const user = req.user
    res.status(200).json({
        success: true,
        user
    });

})
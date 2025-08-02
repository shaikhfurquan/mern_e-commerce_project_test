import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pleae enter the your name."],
        minlength: [3, "Invalid name. Name should be contain more than 3 characters"],
        maxlength: [25, "Invalid name. Name can't exceed more then 30 characters"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Pleae enter your email"],
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [4, "Password should be greater than 3 characters"],
        trim: true,
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,



}, { timestamps: true });



// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next()
});

// Verifying the password
userSchema.methods.verifyPassword = async function (userEnteredPassword) {
    return await bcrypt.compare(userEnteredPassword, this.password)
}

// Generating the token 
userSchema.methods.generatejwtToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })
}


// Generating the reset password token
userSchema.methods.generatePasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000 // 30-min
    return resetToken;
}


const UserModel = mongoose.model('User', userSchema);
export default UserModel;

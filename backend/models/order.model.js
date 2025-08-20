import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true },
        phoneNo: { type: String, required: true },
    },

    orderItems: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    }],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true },
    },

    paidAt: {
        type: Date,
        required: true
    },

    taxPrice: {
        type: Number,
        required: true,
        default: 0
    },

    itemPrice: {
        type: Number,
        required: true,
        default: 0
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },

    deliveredAt: {
        type: Date,
        // required: true
    },



}, { timestamps: true });


const OrderModel = mongoose.model('Oder', orderSchema);
export default OrderModel;

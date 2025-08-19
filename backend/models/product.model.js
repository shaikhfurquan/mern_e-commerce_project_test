import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pleae enter the product name."],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Pleae enter the product description."],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxlength: [7, "Price cannot be exceed 7 digits"],
        trim: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    stock: {
        type: String,
        required: [true, "Please enter product stock"],
        maxlength: [5, "stock cannot exceed 5 digits"],
        default: 1
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    addedByUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }


}, { timestamps: true });


const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;

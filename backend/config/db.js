import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}${process.env.DB_NAME}`);
        console.log(`Connected to DB successfully ==> ${process.env.DB_URL}${process.env.DB_NAME}`);
    
    } catch (error) {
        console.log(`Error while connecting to MongoDB: \n${error.message}`);
    }
};

export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("DB Connected successfully"))
    .catch((error) => console.log("Error connecting DB", error))
}

export default connectDB;
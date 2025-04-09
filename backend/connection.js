import mongoose from "mongoose";

const connectDB = async (url) => {
    mongoose.connect(url)
    .then(()=> console.log("DB Connected successfully"))
    .catch((error) => console.log("Error connecting DB", error))
}

export default connectDB;
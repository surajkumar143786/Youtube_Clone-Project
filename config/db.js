import mongoose from "mongoose";


// function for db connection
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("DB Connected Successfully");
        })
        .catch((err) => {
            console.log("DB not Connected!!");
            console.log(err.message);
        });
};

export default connectDB;

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'
import userRoute from "./routes/user.route.js"
// import stadiumRoute from "./routes/stadium.route.js"


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((error) => {
        console.error(error.message);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
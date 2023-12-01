import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/database.js";
import postRoute from "./routes/post.js";
import userRoute from "./routes/user.js";
import messageRoute from "./routes/message.js";
import chatRoute from "./routes/chat.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";

dotenv.config();

const app = express();

//middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/v1", postRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", messageRoute);
app.use("/api/v1", chatRoute);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port: ${process.env.port}`)
);
//to connect the mongo db
connectDb();

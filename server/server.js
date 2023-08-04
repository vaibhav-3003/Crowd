import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/database.js';
import postRoute from './routes/post.js'
import userRoute from './routes/user.js'

dotenv.config()

const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use('/api/v1',postRoute)
app.use('/api/v1',userRoute)

app.listen(process.env.PORT,()=> console.log(`Server running on port: ${process.env.port}`));
//to connect the mongo db
connectDb()
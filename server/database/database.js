import mongoose from 'mongoose';

const connectDb = ()=>{
    mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology : true
    })
    .then(con => console.log(`Database Connected`))
    .catch(err=> console.log(`Some error ocuured:${err.message}`));
}

export default connectDb
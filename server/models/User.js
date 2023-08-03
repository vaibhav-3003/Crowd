import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter your Name"]
    },
    avatar:{
        public_id: String,
        url: String
    },
    email:{
        type: String,
        unique : [true,"Email already exists"],
        required:[true,"Please enter an email"]
    },
    password:{
        type: String,
        required:[true,"Please enter a password"],
        minlength: [6,"Password must be at least 6 characters"],
        select: false,
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

})

export default mongoose.model("User",userSchema)
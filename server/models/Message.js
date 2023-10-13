import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    chatId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    type:{
        type: String,
        enum: ["text", "media", "doc"],
    },
    message:{
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
import mongoose from 'mongoose'

const chatSchema = mongoose.Schema({
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
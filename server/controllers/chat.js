import Chat from "../models/Chat.js";
import User from '../models/User.js'
import Message from "../models/Message.js";

export const createChat = async(req,res)=>{
    try {
        const {senderId,receiverId} = req.body

        const existingChat = await Chat.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (existingChat) {
            return res.status(200).json({
                success: true,
                chat: existingChat,
            });
        }

        // Create new chat
        const newChat = new Chat({
            members: [senderId, receiverId],
        });

        const savedChat = await newChat.save();

        res.status(201).json({
            success: true,
            chat: savedChat,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const showChat = async(req,res)=>{
    try {
        const {chatId} = req.params

        const existingChat = await Chat.findById(chatId).populate('members messages');

        if (existingChat) {
            return res.status(200).json({
                success: true,
                chat: existingChat,
            });
        }

        res.status(404).json({
            success: false,
            message: "Chat not found"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const showChatList = async(req,res)=>{
    try {
        const {userId} = req.body

        const chats = await Chat.find({
            members: { $in: [userId] },
        }).populate('members messages');

        if (chats) {
            return res.status(200).json({
                success: true,
                chats: chats,
            });
        }

        res.status(404).json({
            success: false,
            message: "Chat not found"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

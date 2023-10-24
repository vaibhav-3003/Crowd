import Chat from "../models/Chat.js"
import Message from "../models/Message.js"
import cloudinary from 'cloudinary'

export const sendMessage = async(req,res)=>{
    try {
        const {senderId,receiverId,type,text,files} = req.body

        if(!senderId && !receiverId && !type){
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            })
        }

        let existingChat = await Chat.findOne({
          members: { $all: [senderId, receiverId] },
        });

        if (!existingChat) {
          // Create a new chat if it doesn't exist
          existingChat = new Chat({
            members: [senderId, receiverId],
          });
          await existingChat.save();
        }

        if(files.length > 0){

          files.forEach(async(file)=>{
            const myCloud = await cloudinary.v2.uploader.upload(file.src,{
              folder: "crowd/messages",
            })

            const message = new Message({
              sender: senderId,
              receiver: receiverId,
              message: null,
              type,
              file: myCloud.secure_url,
              chatId: existingChat._id,
            })

            await message.save();
            existingChat.messages.push(message);
            await existingChat.save();
          })
        }

        if(text.length>0){
          const message = new Message({
            sender: senderId,
            receiver: receiverId,
            message: text,
            type,
            chatId: existingChat._id,
          });

          // Save the message to MongoDB
          await message.save();
          existingChat.messages.push(message);
          await existingChat.save();
        }

        if(type==='like'){
          const message = new Message({
            sender: senderId,
            receiver: receiverId,
            message: null,
            type,
            chatId: existingChat._id,
          });

          // Save the message to MongoDB
          await message.save();
          existingChat.messages.push(message);
          await existingChat.save();
        }

        res.status(200).json({
          success: true,
          existingChat,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
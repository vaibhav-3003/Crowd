import Chat from "../models/Chat.js"
import Message from "../models/Message.js"
export const sendMessage = async(req,res)=>{
    try {
        const {senderId,receiverId,type,text} = req.body

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

        const message = new Message({
          sender: senderId,
          receiver: receiverId,
          message: text,
          type,
          chatId: existingChat._id
        }); 
        
        await message.save()

        existingChat.messages.push(message)

        await existingChat.save()

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
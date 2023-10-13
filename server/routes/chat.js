import express from 'express'
import { createChat, showChat,showChatList } from '../controllers/chat.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post('/create/chat',isAuthenticated,createChat)
router.get('/chat/:chatId',isAuthenticated,showChat)
router.post('/user/chats',isAuthenticated,showChatList)

export default router
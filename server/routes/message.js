import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js'
import { sendMessage } from '../controllers/message.js'

const router = express.Router()

router.post('/send/message',isAuthenticated,sendMessage)

export default router

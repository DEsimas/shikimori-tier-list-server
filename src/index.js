import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'

import authenticateToken from './middlewares/authenticateToken.js'
import refresh from './endpoints/post/refresh.js'
import login from './endpoints/post/login.js'
import logout from './endpoints/delete/logout.js'
import register from './endpoints/post/register.js'
import linkCode from './endpoints/post/linkCode.js'
import linkUsername from './endpoints/get/linkUsername.js'
import linkVerify from './endpoints/get/linkVerify.js'
import linkCheck from './endpoints/get/linkCheck.js'
import unlink from './endpoints/delete/unlink.js'

config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL]
}))

app.get('/link/check', authenticateToken, linkCheck)
app.get('/link/username', authenticateToken, linkUsername)
app.get('/link/verify', authenticateToken, linkVerify)

app.post('/register', register)
app.post('/refresh', refresh)
app.post('/login', login)
app.post('/link/code', authenticateToken, linkCode)

app.delete('/logout', logout)
app.delete('/unlink', authenticateToken, unlink)

app.listen(process.env.PORT)
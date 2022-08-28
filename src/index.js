import { config } from 'dotenv'
import express from 'express'

import authenticateToken from './middlewares/authenticateToken.js'
import refresh from './endpoints/post/refresh.js'
import login from './endpoints/post/login.js'
import logout from './endpoints/delete/logout.js'
import register from './endpoints/post/register.js'
import linkCode from './endpoints/post/linkCode.js'

config()

const app = express()

app.use(express.json())

app.get('/', authenticateToken, (req, res) => {
    console.log(req.user)
    res.sendStatus(200)
})

app.post('/register', register)
app.post('/refresh', refresh)
app.post('/login', login)
app.post('/link/code', authenticateToken, linkCode)

app.delete('/logout', logout)

app.listen(process.env.PORT)
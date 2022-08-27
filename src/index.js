import { config } from 'dotenv'
import express from 'express'

import authenticateToken from './middlewares/authenticateToken.js'
import refresh from './endpoints/post/refresh.js'
import login from './endpoints/post/login.js'

config()

const app = express()

app.use(express.json())

app.get('/', authenticateToken, (req, res) => {
    console.log(req.user)
    res.sendStatus(200)
})

app.post('/refresh', refresh)
app.post('/login', login)

app.listen(process.env.PORT)
import { config } from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'

import prisma from './prisma.js'
import authenticateToken from './middlewares/authenticateToken.js'
import generateAccessToken from './helpers/generateAccessToken.js'
import generateRefreshToken from './helpers/generateRefreshToken.js'

config()

const app = express()

app.use(express.json())

app.get('/', authenticateToken, (req, res) => {
    console.log(req.user)
    res.sendStatus(200)
})

app.post('/refresh', async (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    const tokenRecord = await prisma.RefreshToken.findUnique({
        where: {
            token: refreshToken
        }
    })
    if (tokenRecord == null) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        res.json({ accessToken: generateAccessToken({ username: user.username }) })
    })
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = { username }
    res.json({ accessToken: generateAccessToken(user), refreshToken: await generateRefreshToken(user) })
})

app.listen(process.env.PORT)
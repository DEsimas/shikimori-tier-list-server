import { config } from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

import authenticateToken from './middlewares/authenticateToken.js'

config()

const app = express()
const prisma = new PrismaClient()

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

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = { username }
    res.json({ accessToken: generateAccessToken(user), refreshToken: generateRefreshToken(user) })
})

function generateRefreshToken(user) {
    const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '48h' })
    prisma.RefreshToken.create({ data: { token } })
    return token
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

app.listen(process.env.PORT)
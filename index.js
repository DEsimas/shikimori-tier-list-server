const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const tokens = []

app.use(express.json())

app.get('/', authenticateToken, (req, res) => {
    console.log(req.user)
    res.sendStatus(200)
})

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!tokens.includes(refreshToken)) return res.sendStatus(403)
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
    tokens.push(token)
    return token
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(process.env.PORT)
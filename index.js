const express = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(express.json())

app.post('/login', (req, res) => {
    const {username, password} = req.body
    const user = {username, password}
    console.log(user)
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken })
})

app.listen(3000)
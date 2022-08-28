import jwt from 'jsonwebtoken'

import prisma from '../../prisma.js'
import generateAccessToken from '../../helpers/generateAccessToken.js'

export default async function refresh(req, res) {
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
        res.json({ accessToken: generateAccessToken({ username: user.username, id: user.id }) })
    })
}
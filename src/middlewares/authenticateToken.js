import jwt from 'jsonwebtoken'
import prisma from '../prisma.js'

export default function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = await prisma.User.findUnique({
            where: {
                id: user.id
            },
            select: {
                id: true,
                username: true,
                auth: {
                    select: {
                        id: true,
                        password: true
                    }
                },
                link: {
                    select: {
                        id: true,
                        username: true,
                        code: true,
                        connected: true
                    }
                }
            }
        })
        next()
    })
}
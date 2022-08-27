import jwt from 'jsonwebtoken'
import prisma from '../prisma.js'

export default async function generateRefreshToken(user) {
    const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '48h' })
    await prisma.RefreshToken.create({ data: { token } })
    return token
}
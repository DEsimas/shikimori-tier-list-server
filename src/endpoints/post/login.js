import generateAccessToken from '../../helpers/generateAccessToken.js'
import generateRefreshToken from '../../helpers/generateRefreshToken.js'
import prisma from '../../prisma.js'

export default async function login(req, res) {
    const { username, password } = req.body

    const userRecord = await prisma.User.findUnique({
        where: { username }
    })

    const user = { username }
    res.json({ accessToken: generateAccessToken(user), refreshToken: await generateRefreshToken(user) })
}
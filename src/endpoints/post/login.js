import generateAccessToken from '../../helpers/generateAccessToken.js'
import generateRefreshToken from '../../helpers/generateRefreshToken.js'
import prisma from '../../prisma.js'

export default async function login(req, res) {
    const { username, password } = req.body

    const userRecord = await prisma.User.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            auth: {
                select: {
                    password: true
                }
            }
        }
    })

    if (userRecord == null) res.status(400).send({ error: 'User does not exist' })
    if (userRecord.auth.password != password) return res.status(400).send({ error: 'Wrong password' })

    const user = { username }
    res.json({ accessToken: generateAccessToken(user), refreshToken: await generateRefreshToken(user) })
}
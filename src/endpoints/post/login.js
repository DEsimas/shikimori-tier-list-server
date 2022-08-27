import generateAccessToken from '../../helpers/generateAccessToken.js'
import generateRefreshToken from '../../helpers/generateRefreshToken.js'

export default async function login(req, res) {
    const { username, password } = req.body
    const user = { username }
    res.json({ accessToken: generateAccessToken(user), refreshToken: await generateRefreshToken(user) })
}
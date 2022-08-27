import prisma from '../../prisma.js'

export default async function register(req, res) {
    if (req.body.username == undefined ||
        req.body.username == '' ||
        req.body.username?.length <= 3 ||
        req.body.username?.length >= 20 ||
        req.body.password == undefined ||
        req.body.password == '' ||
        req.body.password?.length <= 5 ||
        req.body.password?.length >= 20) return res.sendStatus(400)

    try {
        const user = await prisma.User.create({
            data: {
                username: req.body.username,
            }
        })

        const auth = await prisma.Auth.create({
            data: {
                password: req.body.password,
                userId: user.id
            }
        })

        await prisma.User.update({
            where: {
                username: user.username
            },
            data: {
                authId: auth.id
            }
        })

        res.sendStatus(200)
    } catch (err) {
        if (err.code == 'P2002') return res.status(400).send({ error: "This username is already taken" })
        console.log(err)
        res.sendStatus(500)
    }
}
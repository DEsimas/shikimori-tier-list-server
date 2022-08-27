import prisma from "../../prisma.js";

export default async function logout(req, res) {
    try {
        await prisma.RefreshToken.delete({
            where: {
                token: req.body.token
            }
        })
        res.sendStatus(200)
    } catch {
        res.sendStatus(400)
    }
}
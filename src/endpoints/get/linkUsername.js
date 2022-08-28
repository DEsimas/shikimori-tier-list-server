import prisma from "../../prisma.js";

export default async function linkUsername(req, res) {
    try {
        const linkRecord = await prisma.Link.findUnique({
            where: {
                userId: req.user.id
            }
        })

        return res.status(200).send({ username: linkRecord?.username ?? '' })
    } catch (err) {
        return res.sendStatus(400)
    }
}
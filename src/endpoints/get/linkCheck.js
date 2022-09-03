import prisma from "../../prisma.js";

export default async function linkCheck(req, res) {
    try {
        const linkRecord = await prisma.Link.findUnique({
            where: {
                userId: req.user.id
            }
        })

        return res.status(200).send({ check: linkRecord?.connected || false })
    } catch (err) {
        return res.sendStatus(400)
    }
}
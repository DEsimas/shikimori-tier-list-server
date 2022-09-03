import prisma from "../../prisma.js";

export default async function unlink(req, res) {
    try {
        await prisma.Link.delete({
            where: {
                userId: req.user.id
            }
        })
        res.sendStatus(200)
    } catch {
        res.sendStatus(400)
    }
}
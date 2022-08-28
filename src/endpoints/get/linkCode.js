import prisma from "../../prisma.js";

export default async function linkCode(req, res) {
    try {
        const linkRecord = await prisma.Link.findUnique({
            where: {
                userId: req.user.id
            }
        })

        return res.status(200).send({ code: linkRecord.code ?? '' })
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
}
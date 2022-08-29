import axios from "axios"

import prisma from "../../prisma.js"

export default async function linkCode(req, res) {
    const nickname = req.body.nickname
    try {
        const response = await axios.get(`https://shikimori.one/api/users?search=${nickname}`)
        const users = response.data.filter(el => (el.nickname == nickname))
        if (users.length != 1) return res.status(400).send({ error: "Wrong username" })
    } catch {
        return res.sendStatus(500)
    }

    const rand = Math.random().toString(16).substr(2, 8)
    try {
        const linkRecord = await prisma.Link.create({
            data: {
                username: nickname,
                code: rand,
                connected: false,
                userId: req.user.id
            }
        })

        await prisma.User.update({
            where: {
                id: req.user.id
            },
            data: {
                linkId: linkRecord.id
            }
        })

        return res.status(200).send({ code: rand })
    } catch (e) {
        const linkRecord = await prisma.Link.findUnique({
            where: {
                userId: req.user.id
            }
        })

        if (linkRecord.connected) return res.status(400).send({ error: 'Account already linked' })
        if (!linkRecord.code) {
            await prisma.Link.update({
                where: {
                    username: nickname
                },
                data: {
                    code: rand
                }
            })
        }
        return res.status(200).send({ code: rand })
    }
}
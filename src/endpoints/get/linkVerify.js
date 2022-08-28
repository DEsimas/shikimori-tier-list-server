import prisma from '../../prisma.js'
import axios from 'axios'

export default async function linkVerify(req, res) {
    const userRecord = await prisma.User.findUnique({
        where: {
            id: req.user.id
        },
        select: {
            id: true,
            username: true,
            link: {
                select: {
                    id: true,
                    username: true,
                    code: true
                }
            }
        }
    })

    if (userRecord.link = null) return res.status(400).send({ error: 'Username not provided' })

    const response = await axios.get(`https://shikimori.one/api/users?search=${userRecord.link.username}`)
    const userId = response.data.filter(el => (el.nickname == userRecord.link.username))[0].id
    const user = (await axios.get(`https://shikimori.one/api/users/${userId}`)).data
    const code = user.common_info[1].split('>')[1].split('<')[0]

    if (code == userRecord.link.code) {
        await prisma.Link.update({
            where: {
                id: userRecord.link.id
            },
            data: {
                connected: true
            }
        })

        return res.sendStatus(200)
    } else {
        return res.status(400).send({ error: 'Wrong code' })
    }
}
import prisma from '../prisma.js'

export default async function logUser(req) {
    const uwu = await prisma.User.findUnique({
        where: {
            id: req.user.id
        },
        select: {
            id: true,
            username: true,
            auth: {
                select: {
                    id: true,
                    password: true
                }
            },
            link: {
                select: {
                    id: true,
                    username: true,
                    code: true,
                    connected: true
                }
            }
        }
    })

    console.log(uwu)
}
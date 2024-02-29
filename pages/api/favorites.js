import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {

    try {
        if (req.method !== 'GET') {
            return res.status(405).end()
        }
        const { currentUser } = await serverAuth(req, res)
        const favoritesMovies = await prismadb.user.findUnique({
            where: {
                email: currentUser?.email,
            },
            select: {
                favoriteMovies: true
            }
        })
        return res.status(200).json(favoritesMovies)
    } catch (error) {
        console.log(error);
        return res.status(400).end()
    }
}
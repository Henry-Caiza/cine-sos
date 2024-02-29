import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res)
            const { movieData } = req.body
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteMovies: {
                        push: movieData,
                    }
                }
            })
            return res.status(200).json(user)
        }

        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req, res)

            const { movieData } = req.body

            function deleteMovieFavorite(movieToDelete, moviesFavorites) {
                const newArr = moviesFavorites.filter((movie) => {
                    return movie.id !== movieToDelete.id;
                });
                return newArr;
            }

            const updatedFavoriteIds = deleteMovieFavorite(movieData, currentUser.favoriteMovies)
            const updateUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || ''
                },
                data: {
                    favoriteMovies: updatedFavoriteIds,
                }
            })

            return res.status(200).json(updateUser)
        }
        return res.staus(405).end()
    } catch (error) {
        console.log(error);
        return res.status(400).end()
    }
}
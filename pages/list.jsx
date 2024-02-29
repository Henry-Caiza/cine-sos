import CardSlider from "@/components/CardSlider";
import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { getSession } from "next-auth/react";
import Head from "next/head";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }
    return {
        props: {}
    }
}

function ListPage() {
    const { data: user } = useCurrentUser()
    const { data: favorites = [] } = useFavorites()
    try {
        const favoritesMovies = favorites.favoriteMovies
        return (
            <>
                <Head>
                    <title>My List | CINESOS</title>
                    <meta name='My List' content='My List Page of CINESOS' />
                </Head>
                <main className='pl-4 md:pl-40 lg:pl-48 h-full w-full pr-4 pb-24 dark:bg-dark'>
                    <Header name={user?.name} type='movie' />
                    {
                        favoritesMovies.length ? <CardSlider title="My List" data={favoritesMovies} list_liked={true}
                            classNameCardSlider='-mt-4 pt-2'
                            className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
                            classNameCard='w-auto h-auto'
                        /> :
                            <div>
                                <h3 className='text-xl font-semibold mb-4 mt-8 text-neutral-700 dark:text-neutral-100'>My List</h3>
                                <p>
                                    You don&apos;t have anything yet
                                </p>
                            </div>
                    }
                </main>
            </>
        )
    } catch (error) {
        console.log(error);
    }
}

export default ListPage
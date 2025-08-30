import { Header } from "../components/Header"
import { SearchForm } from "../components/SearchForm"


export const HomeView = () => {
    return (
        <>
            <Header />

            <main
                className="bg-gray-200 min-h-screen py-10 
                    bg-no-repeat bg-right-top 
                    lg:bg-[url('/bg.svg')] 
                    lg:bg-[length:50%]"
            >
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            Todas tus <span className="text-cyan-400">Redes Sociales </span>
                            en un solo lugar
                        </h1>

                        <p className="text-slate-800 text-xl">
                            Únete a más de 200 mil personas compartiendo sus redes sociales, comparte tu
                            perfil de TikTok, Facebook, Instagram, Twitter, LinkedIn y más.
                        </p>

                        <SearchForm />
                    </div>

                </div>
            </main>
        </>
    )
}

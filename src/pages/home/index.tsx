import { Link } from "react-router";
import { HomeHeader } from "../../components/HomeHeader";

export function Home() {
    return (
        <>
            <HomeHeader />
            <main className="w-full flex flex-col justify-center text-white text-center">
                <section className="space-y-7 bg-gradient-to-t from-neutral-700 to-neutral-800 py-20 px-2">
                    <h1 className="sm:text-4xl text-3xl font-bold">
                        Todos os seus links em um só lugar
                    </h1>
                    <p className="text-lg w-full max-w-md mx-auto">
                        Crie seu perfil e compartilhe todos os seus links com um
                        único link personalizado.
                    </p>
                    <Link
                        to="/signup"
                        className="bg-blue-600 rounded-md text-white font-medium cursor-pointer transition-colors hover:bg-blue-500 px-4 py-2.5"
                    >
                        Comece grátis
                    </Link>
                </section>

                <section className="text-center py-16">
                    <h2 className="text-4xl mb-7">Como funciona?</h2>
                    <ol className="text-lg space-y-4">
                        <li>📝 Crie uma conta grátis</li>
                        <li>➕ Adicione seus links</li>
                        <li>🚀 Compartilhe com o mundo</li>
                    </ol>
                </section>
            </main>
        </>
    );
}

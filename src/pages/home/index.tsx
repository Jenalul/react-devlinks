import { Link } from "react-router";

export function Home() {
    return (
        <>
            <header className="w-full flex justify-center">
                <div className="w-11/12 text-white flex items-center justify-between py-7">
                    <Link to="/">
                        <h1 className="text-white font-bold text-2xl">
                            Dev
                            <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
                                Link
                            </span>
                        </h1>
                    </Link>
                    <nav className="space-x-6">
                        <Link
                            to="/login"
                            className="font-medium transition-colors hover:text-gray-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-blue-600 rounded-md text-white font-medium cursor-pointer transition-colors hover:bg-blue-500 px-3 py-2.5"
                        >
                            Criar conta
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="w-full flex flex-col justify-center text-white text-center px-2">
                <section className="space-y-7 bg-gradient-to-t from-neutral-700 to-neutral-800 py-20">
                    <h1 className="text-5xl font-bold">
                        Todos os seus links em um só lugar
                    </h1>
                    <p className="text-lg">
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

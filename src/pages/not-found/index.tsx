import { Link } from "react-router";

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen text-white gap-4">
            <h1 className="font-medium text-5xl">404</h1>
            <h2 className="font-bold text-4xl">Página não encontrada!</h2>
            <p className="italic text-xl">
                Você caiu em uma página que não existe.
            </p>

            <Link
                className="bg-gray-50/20 py-2.5 px-5 rounded-md font-medium transition-colors hover:bg-gray-50/30"
                to="/"
            >
                Voltar para Home
            </Link>
        </div>
    );
}

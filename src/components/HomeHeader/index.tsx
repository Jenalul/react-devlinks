import { Link } from "react-router";

export function HomeHeader() {
    return (
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
    );
}

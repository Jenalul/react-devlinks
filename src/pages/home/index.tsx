import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { Social } from "../../components/Social";

export function Home() {
    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
                JenaCarry
            </h1>
            <span className="text-gray-50 my-4">Veja meus links 👇</span>

            <main className="w-11/12 max-w-xl text-center space-y-4">
                <section>
                    <a
                        href="#"
                        className="block text-base md:text-lg bg-white py-2 rounded-lg select-none transition-transform hover:scale-105"
                    >
                        Canal no YouTube
                    </a>
                </section>

                <footer className="flex justify-center gap-3 my-4">
                    <Social url="https://www.linkedin.com/in/jean-h-dias/">
                        <FaLinkedinIn size={35} color="#fff" />
                    </Social>
                    <Social url="https://www.instagram.com/jean__said/">
                        <FaInstagram size={35} color="#fff" />
                    </Social>
                    <Social url="https://github.com/JenaCarry">
                        <FaGithub size={35} color="#fff" />
                    </Social>
                </footer>
            </main>
        </div>
    );
}

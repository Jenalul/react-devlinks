import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { Social } from "../../components/Social";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";

export function User() {
    const [signed, setSigned] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setSigned(true);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            {signed && <Header />}
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
                JenaCarry
            </h1>

            <h2>Você está na página em desenvolvimento</h2>

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

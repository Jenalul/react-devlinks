import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";
import { Social } from "../../components/Social";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../services/firebaseConnection";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import {
    collection,
    getDocs,
    orderBy,
    query,
    doc,
    getDoc,
} from "firebase/firestore";
import type { LinkProps } from "../admin";

interface SocialLinksProps {
    linkedIn?: string;
    instagram?: string;
    github?: string;
}

export function Home() {
    const [signed, setSigned] = useState<boolean>(false);
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setSigned(true);
                await Promise.all([
                    loadLinks(user.uid),
                    loadSocialLinks(user.uid),
                ]);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    async function loadLinks(uid: string) {
        const linksRef = collection(db, "users", uid, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        try {
            const querySnapShot = await getDocs(queryRef);
            const list: LinkProps[] = [];

            querySnapShot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                });
            });

            setLinks(list);
        } catch (error) {
            console.error("Erro ao buscar links:", error);
        }
    }

    async function loadSocialLinks(uid: string) {
        const docRef = doc(db, "users", uid, "mainLinks", "social");

        try {
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                const data = snapshot.data();
                setSocialLinks({
                    linkedIn: data.linkedIn,
                    instagram: data.instagram,
                    github: data.github,
                });
            }
        } catch (error) {
            console.error("Erro ao buscar links sociais:", error);
        }
    }

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            {signed && <Header />}
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
                JenaCarry
            </h1>
            <span className="text-gray-50 my-4">Veja meus links 👇</span>

            <main className="w-11/12 max-w-xl text-center space-y-4">
                {links.length > 0 &&
                    links.map((link) => (
                        <section key={link.id}>
                            <a
                                href={link.url}
                                className="block text-base md:text-lg py-2 rounded-lg select-none transition-transform hover:scale-105"
                                style={{
                                    backgroundColor: link.bg,
                                    color: link.color,
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.name}
                            </a>
                        </section>
                    ))}

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">
                        <Social url={socialLinks?.linkedIn}>
                            <FaLinkedinIn size={35} color="#fff" />
                        </Social>
                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={35} color="#fff" />
                        </Social>
                        <Social url={socialLinks?.github}>
                            <FaGithub size={35} color="#fff" />
                        </Social>
                    </footer>
                )}
            </main>
        </div>
    );
}

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
import { useNavigate, useParams } from "react-router";
import { Loading } from "../../components/Loading";

interface SocialLinksProps {
    linkedIn?: string;
    instagram?: string;
    github?: string;
}

export function User() {
    const [signed, setSigned] = useState<boolean>(false);
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { username } = useParams();

    useEffect(() => {
        async function checkUserExists() {
            if (!username) return;
            const userDocRef = doc(db, "usernames", username);
            const snapshot = await getDoc(userDocRef);
            return snapshot.exists();
        }

        async function loadLinks() {
            if (!username) return;

            const linksRef = collection(db, "usernames", username, "links");
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

        async function loadSocialLinks() {
            if (!username) return;

            const docRef = doc(
                db,
                "usernames",
                username,
                "mainLinks",
                "social"
            );

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

        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            setSigned(!!user);
        });

        async function loadPageData() {
            if (!username) return;

            const userExists = await checkUserExists();

            if (userExists === false) {
                navigate("/notfound");
                return;
            }

            Promise.all([loadLinks(), loadSocialLinks(), setLoading(false)]);
        }

        loadPageData();

        return () => unsubscribeAuth();
    }, [username, navigate]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="flex flex-col w-full py-4 items-center justify-center">
                    {signed && <Header />}
                    <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
                        @{username}
                    </h1>
                    {links.length > 0 ? (
                        <span className="text-gray-50 text-lg my-4">
                            Veja meus links 👇
                        </span>
                    ) : (
                        <div className="text-center text-gray-50 my-4">
                            <img
                                src="/images/empty.png"
                                alt="Caixa vazia"
                                className="my-4 w-full max-w-md"
                            />
                            <span className="text-lg">
                                isso está meio vazio...
                            </span>
                        </div>
                    )}

                    <main className="w-11/12 max-w-xl text-center space-y-4">
                        {links.length > 0 &&
                            links.map((link) => (
                                <section key={link.id}>
                                    <a
                                        href={link.url}
                                        className="block text-base font-medium md:text-lg py-2 rounded-lg select-none transition-transform hover:scale-105"
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

                        {socialLinks &&
                            (socialLinks.github ||
                                socialLinks.instagram ||
                                socialLinks.linkedIn) && (
                                <footer className="flex justify-center gap-3 my-6">
                                    {socialLinks?.linkedIn && (
                                        <Social url={socialLinks.linkedIn}>
                                            <FaLinkedinIn
                                                size={35}
                                                color="#fff"
                                            />
                                        </Social>
                                    )}
                                    {socialLinks.instagram && (
                                        <Social url={socialLinks?.instagram}>
                                            <FaInstagram
                                                size={35}
                                                color="#fff"
                                            />
                                        </Social>
                                    )}
                                    {socialLinks.github && (
                                        <Social url={socialLinks?.github}>
                                            <FaGithub size={35} color="#fff" />
                                        </Social>
                                    )}
                                </footer>
                            )}
                    </main>
                </div>
            )}
        </>
    );
}

import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConnection";
import type { UserInfoProps } from "../admin";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface NewLinksProps {
    linkedIn?: string;
    instagram?: string;
    github?: string;
}

export function NetWorks() {
    const [linkedIn, setLinkedIn] = useState<string>("");
    const [instagram, setInstagram] = useState<string>("");
    const [github, setGithub] = useState<string>("");
    const [userInfo, setUserInfo] = useState<UserInfoProps>();
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;

        if (!user) {
            navigate("/login");
            return;
        }

        const uid = user.uid;

        const userInfoRef = doc(db, "users", uid, "userInfo", "main");
        getDoc(userInfoRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setUserInfo({ id: uid, name: snapshot.data()?.username });
                }
            })
            .catch((error) => console.error(error));

        async function loadingSocial() {
            const docRef = doc(db, "users", uid, "mainLinks", "social");
            try {
                const snapshot = await getDoc(docRef);
                if (snapshot.data() !== undefined) {
                    setLinkedIn(snapshot.data()?.linkedIn);
                    setInstagram(snapshot.data()?.instagram);
                    setGithub(snapshot.data()?.github);
                }
            } catch (error) {
                console.error("Erro ao buscar links.", error);
            }
        }

        loadingSocial();
    }, [navigate]);

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (!userInfo?.id || !userInfo.name) return;

        if (!linkedIn && !instagram && !github) {
            toast.warning("Preencha pelo menos um link.");
            return;
        }

        const newLinks: NewLinksProps = {
            linkedIn: linkedIn,
            instagram: instagram,
            github: github,
        };

        try {
            await setDoc(
                doc(db, "users", userInfo.id, "mainLinks", "social"),
                newLinks
            );

            await setDoc(
                doc(db, "usernames", userInfo.name, "mainLinks", "social"),
                newLinks
            );

            toast.success("Links cadastrados com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar links.", error);
            toast.error("Erro ao salvar links.");
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen pb-7 px-2">
            <Header />
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">
                Minhas redes sociais
            </h1>

            <form
                onSubmit={handleRegister}
                className="flex flex-col max-w-xl w-full"
            >
                <label
                    htmlFor="linkedIn"
                    className="text-white font-medium my-2"
                >
                    Link do LinkedIn
                </label>
                <Input
                    type="url"
                    id="linkedIn"
                    placeholder="Digite a url do linkedIn..."
                    value={linkedIn}
                    onChange={(e) => setLinkedIn(e.target.value)}
                />

                <label
                    htmlFor="instagram"
                    className="text-white font-medium my-2"
                >
                    Link do Instagram
                </label>
                <Input
                    type="url"
                    id="instagram"
                    placeholder="Digite a url do instagram..."
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label htmlFor="github" className="text-white font-medium my-2">
                    Link do Github
                </label>
                <Input
                    type="url"
                    id="github"
                    placeholder="Digite a url do github..."
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                />

                <Button type="submit" text="Salvar links" />
            </form>
        </div>
    );
}

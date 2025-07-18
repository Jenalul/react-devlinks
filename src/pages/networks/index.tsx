import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConnection";

export function NetWorks() {
    const [linkedIn, setLinkedIn] = useState<string>("");
    const [instagram, setInstagram] = useState<string>("");
    const [github, setGithub] = useState<string>("");
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        const user = auth.currentUser;

        if (!user) {
            alert("Usuário não autenticado.");
            return;
        }

        const uid = user.uid;
        setUserId(uid);

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
    }, []);

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (!linkedIn && !instagram && !github) {
            alert("Preencha pelo menos um link.");
            return;
        }

        try {
            await setDoc(doc(db, "users", userId, "mainLinks", "social"), {
                linkedIn: linkedIn,
                instagram: instagram,
                github: github,
            });
            alert("Links cadastrados com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar links.", error);
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

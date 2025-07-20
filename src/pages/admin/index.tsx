import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FiTrash } from "react-icons/fi";
import { auth, db } from "../../services/firebaseConnection";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    deleteDoc,
    getDoc,
    setDoc,
} from "firebase/firestore";
import { Button } from "../../components/Button";
import { toast } from "react-toastify";

interface CreateLinkProps {
    name: string;
    url: string;
    bg: string;
    color: string;
    created: Date;
}

export interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export interface UserInfoProps {
    id: string;
    name: string;
}

export function Admin() {
    const [nameInput, setNameInput] = useState<string>("");
    const [urlInput, setUrlInput] = useState<string>("");
    const [textColorInput, setTextColorInput] = useState<string>("#121212");
    const [backgroundColorInput, setBackgroundColorInput] =
        useState<string>("#f1f1f1");
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [userInfo, setUserInfo] = useState<UserInfoProps>();

    useEffect(() => {
        const user = auth.currentUser;

        if (!user) return;

        const uid = user.uid;

        const userInfoRef = doc(db, "users", uid, "userInfo", "main");
        getDoc(userInfoRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setUserInfo({ id: uid, name: snapshot.data()?.username });
                }
            })
            .catch((error) => console.error(error));

        const linksRef = collection(db, "users", uid, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));
        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            const list = [] as LinkProps[];
            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                });
            });
            setLinks(list);
        });

        return () => unsubscribe();
    }, []);

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (!userInfo?.id || !userInfo.name) return;

        if (nameInput.trim() === "" || urlInput.trim() === "") {
            toast.warning("Preencha todos os campos!");
            return;
        }

        const newLink: CreateLinkProps = {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date(),
        };

        let userDocId: string | null = null;

        try {
            // Cria os links no perfil privado
            const userDocRef = await addDoc(
                collection(db, "users", userInfo?.id, "links"),
                newLink
            );
            userDocId = userDocRef.id;

            // Cria os links no perfil público
            await setDoc(
                doc(db, "usernames", userInfo.name, "links", userDocId),
                newLink
            );

            setNameInput("");
            setUrlInput("");
            toast.success("Link cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar o link: ", error);
            toast.error("Erro ao salvar o link.");
            // Se falhar o cadastro, ele deleta do privado
            if (userDocId) {
                try {
                    await deleteDoc(
                        doc(db, "users", userInfo.id, "links", userDocId)
                    );
                    console.log("Rollback: link privado removido.");
                } catch (rollbackError) {
                    console.error("Erro ao fazer rollback:", rollbackError);
                }
            }
        }
    }

    async function handleDelete(id: string) {
        if (!userInfo?.id || !userInfo.name) return;

        const privateLinks = doc(db, "users", userInfo?.id, "links", id);
        const publicLinks = doc(db, "usernames", userInfo?.name, "links", id);
        try {
            await deleteDoc(privateLinks);
            await deleteDoc(publicLinks);
            toast.success("Link deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar o link: ", error);
            toast.error("Erro ao deletar o link.");
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen pb-7 px-2">
            <Header />

            <form
                onSubmit={handleRegister}
                className="flex flex-col mt-8 mb-5 w-full max-w-xl"
            >
                <label
                    htmlFor="name-link"
                    className="text-white font-medium my-2"
                >
                    Nome do link
                </label>
                <Input
                    type="text"
                    id="name-link"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Digite o nome do link..."
                />
                <label
                    htmlFor="url-link"
                    className="text-white font-medium my-2"
                >
                    Url do link
                </label>
                <Input
                    type="url"
                    id="url-link"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Digite a url..."
                />

                <section className="flex flex-col my-4 gap-5">
                    <div className="flex gap-3 items-center">
                        <label
                            htmlFor="text-color-input"
                            className="text-white font-medium my-2"
                        >
                            Cor do link
                        </label>
                        <input
                            type="color"
                            id="text-color-input"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                            className="w-10 h-10"
                        />
                    </div>

                    <div className="flex gap-3 items-center">
                        <label
                            htmlFor="background-color-link"
                            className="text-white font-medium my-2"
                        >
                            Fundo do link
                        </label>
                        <input
                            type="color"
                            id="background-color-link"
                            value={backgroundColorInput}
                            onChange={(e) =>
                                setBackgroundColorInput(e.target.value)
                            }
                            className="w-10 h-10"
                        />
                    </div>
                </section>

                {nameInput.trim() !== "" && (
                    <div className="flex flex-col items-center justify-center mb-7 p-3 border-gray-100/25 border rounded-md">
                        <h2 className="text-white text-xl font-medium mb-3">
                            Preview
                        </h2>
                        <article
                            className={`w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3`}
                            style={{ backgroundColor: backgroundColorInput }}
                        >
                            <p
                                className="font-medium"
                                style={{ color: textColorInput }}
                            >
                                {nameInput}
                            </p>
                        </article>
                    </div>
                )}

                <Button type="submit" text="Cadastrar" />
            </form>

            <h2
                className={`font-bold mb-4 text-2xl ${
                    links.length === 0 ? "text-neutral-400" : "text-white"
                }`}
            >
                {links.length > 0 ? "Meus Links" : "Adicione algum link..."}
            </h2>

            {links.length > 0 &&
                links.map((link) => (
                    <article
                        key={link.id}
                        className="flex items-center justify-between w-11/12 max-w-xl rounded p-3 mb-2 select-none"
                        style={{
                            backgroundColor: link.bg,
                            color: link.color,
                        }}
                    >
                        <p className="font-medium">{link.name}</p>
                        <button
                            onClick={() => handleDelete(link.id)}
                            className="border border-dashed p-1.5 rounded cursor-pointer bg-neutral-900"
                        >
                            <FiTrash size={18} color="#fff" />
                        </button>
                    </article>
                ))}
        </div>
    );
}

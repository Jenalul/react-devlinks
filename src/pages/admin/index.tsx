import { useState, type FormEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FiTrash } from "react-icons/fi";
// import { auth, db } from "../../services/firebaseConnection";
// import {
//     addDoc,
//     collection,
//     onSnapshot,
//     query,
//     orderBy,
//     doc,
//     deleteDoc,
// } from "firebase/firestore";

export function Admin() {
    const [nameInput, setNameInput] = useState<string>("");
    const [urlInput, setUrlInput] = useState<string>("");
    const [textColorInput, setTextColorInput] = useState<string>("#121212");
    const [backgroundColorInput, setBackgroundColorInput] =
        useState<string>("#f1f1f1");

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (nameInput.trim() === "" || urlInput.trim() === "") {
            alert("Preencha todos os campos!");
            return;
        }

        // const user = auth.currentUser;

        // if (!user) {
        //     alert("Usuário não autenticado.");
        //     return;
        // }

        // const uid = user.uid;

        // try {
        //     await addDoc(collection(db, "users", uid, "links"), {
        //         name: nameInput,
        //         url: urlInput,
        //         bg: backgroundColorInput,
        //         color: textColorInput,
        //         created: new Date(),
        //     });
        //     setNameInput("");
        //     setUrlInput("");
        // } catch (error) {
        //     console.error("Erro ao salvar o link: ", error);
        // }
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

                <button
                    type="submit"
                    className="bg-blue-600 h-9 rounded-md text-white font-medium cursor-pointer transition-colors hover:bg-blue-500 mb-7"
                >
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">Meus Links</h2>

            <article
                className="flex items-center justify-between w-11/12 max-w-xl rounded p-3 mb-2 select-none"
                style={{ backgroundColor: "#2563eb", color: "#fff" }}
            >
                <p>Canal do YouTube</p>
                <button className="border border-dashed p-1.5 rounded cursor-pointer bg-neutral-900">
                    <FiTrash size={18} color="#fff" />
                </button>
            </article>
        </div>
    );
}

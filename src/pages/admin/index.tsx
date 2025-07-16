import { useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export function Admin() {
    const [nameInput, setNameInput] = useState<string>("");
    const [urlInput, setUrlInput] = useState<string>("");
    const [textColorInput, setTextColorInput] = useState<string>("#121212");
    const [backgroundColorInput, setBackgroundColorInput] =
        useState<string>("#f1f1f1");

    return (
        <div className="flex flex-col items-center min-h-screen pb-7 px-2">
            <Header />

            <form className="flex flex-col mt-8 mb-5 w-full max-w-xl">
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
                            Canal do YouTube
                        </p>
                    </article>
                </div>
            </form>
        </div>
    );
}

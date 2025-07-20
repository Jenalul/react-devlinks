import { useNavigate } from "react-router";
import { Input } from "../../components/Input";
import { useState, type FormEvent } from "react";

// FireBase
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Logo } from "../../components/Logo";

export function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    // Faz o login do usuário
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (email.trim() === "" || password.trim() === "") {
            alert("Preencha todos os campos!");
            return;
        }

        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Logado com sucesso!");
                navigate("/admin", { replace: true });
            })
            .catch((error) => console.error("Erro ao fazer o login: ", error))
            .finally(() => setLoading(false));
    }

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <Logo />

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex flex-col px-2"
            >
                <Input
                    type="email"
                    value={email}
                    autoComplete="username"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite o seu email..."
                />
                <Input
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a sua senha..."
                />
                <button
                    type="submit"
                    className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer transition-colors hover:bg-blue-500"
                >
                    {loading ? "Carregando..." : "Acessar"}
                </button>
            </form>
        </div>
    );
}

import { useEffect, useState, type FormEvent } from "react";
import { auth, db } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, type AuthError } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { Input } from "../../components/Input";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

export function Signup() {
    const [username, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userNameAvailable, setUsarNameAvailable] = useState<null | boolean>(
        null
    );
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (username.trim().length < 3) {
            setUsarNameAvailable(null);
            return;
        }

        const checkUserName = setTimeout(async () => {
            const docRef = doc(db, "usernames", username);
            const docSnap = await getDoc(docRef);
            setUsarNameAvailable(!docSnap.exists());
        }, 500);

        return () => clearTimeout(checkUserName);
    }, [username]);

    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        if (username.trim().length < 3) {
            alert("Username inválido...");
            return;
        }

        if (!userNameAvailable) {
            alert("Nome de usuário já está em uso.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await addDoc(collection(db, "users", user.uid, "userInfo"), {
                username: username,
                email: email,
                createdAt: serverTimestamp(),
            });

            await setDoc(doc(db, "usernames", username), {
                uid: user.uid,
            });
            alert("Conta criada com sucesso!");
            navigate("/admin", { replace: true });
        } catch (error: unknown) {
            const firebaseError = error as AuthError;
            if (firebaseError.code === "auth/email-already-in-use") {
                alert("Email já existe.");
            } else {
                alert("Erro ao criar a conta.");
            }
        }
        setLoading(false);
    }

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
                    Dev
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
                        Link
                    </span>
                </h1>
            </Link>

            <form
                onSubmit={handleRegister}
                className="w-full max-w-xl flex flex-col px-2"
            >
                <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Digite um nome de usuário..."
                    autoComplete="username"
                />
                <Input
                    type="email"
                    value={email}
                    autoComplete="email"
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
                    {loading ? "Criando conta..." : "Cadastrar"}
                </button>
            </form>
        </div>
    );
}

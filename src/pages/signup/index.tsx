import { useEffect, useState, type FormEvent } from "react";
import { auth, db } from "../../services/firebaseConnection";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { Input } from "../../components/Input";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { Logo } from "../../components/Logo";

export function Signup() {
    const [username, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userNameAvailable, setUserNameAvailable] = useState<null | boolean>(
        null
    );
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    // Se estiver logado redireciona
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/admin");
            }
        });

        return () => unsubscribeAuth();
    }, [navigate]);

    // Verifica se o nome já existe
    useEffect(() => {
        if (username.trim().length < 3) {
            setUserNameAvailable(null);
            return;
        }

        const checkUserName = setTimeout(async () => {
            const docRef = doc(db, "usernames", username);
            const docSnap = await getDoc(docRef);
            setUserNameAvailable(!docSnap.exists());
        }, 500);

        return () => clearTimeout(checkUserName);
    }, [username]);

    // Cria a conta
    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        if (username.trim().length < 3) {
            alert("Username deve ter no mínimo 3 caracteres.");
            return;
        }

        if (/\s/.test(username)) {
            alert("O nome de usuário não pode conter espaços.");
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            alert(
                "O nome de usuário só pode conter letras, números e underlines (_)."
            );
            return;
        }

        if (!userNameAvailable) {
            alert("Username já existe.");
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

            await setDoc(doc(db, "users", user.uid, "userInfo", "main"), {
                username: username,
                email: email,
                createdAt: serverTimestamp(),
            });

            await setDoc(doc(db, "usernames", username), {});
            alert("Conta criada com sucesso!");
            navigate("/admin", { replace: true });
        } catch (error) {
            console.error("Erro ao criar a conta.", error);
            alert("Erro ao criar a conta.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <Logo />

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

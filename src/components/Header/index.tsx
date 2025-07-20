import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import { auth, db } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export function Header() {
    const [username, setUserName] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;
        const uid = user.uid;
        const userInfoRef = doc(db, "users", uid, "userInfo", "main");
        getDoc(userInfoRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setUserName(snapshot.data()?.username);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    async function handleLogout() {
        await signOut(auth)
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.error("Erro ao fazer logout:", error);
            });
    }

    return (
        <header className="w-full max-w-2xl mt-4 px-2">
            <nav className="bg-white h-12 flex items-center justify-between rounded-md px-3">
                <div className="flex gap-4 font-medium">
                    <Link to={`/${username}`}>Home</Link>
                    <Link to="/admin">Links</Link>
                    <Link to="/admin/social">Redes Sociais</Link>
                </div>

                <button onClick={handleLogout} className="cursor-pointer">
                    <BiLogOut size={28} color="#db2629" />
                </button>
            </nav>
        </header>
    );
}

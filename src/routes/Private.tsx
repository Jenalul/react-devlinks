import { type JSX, type ReactNode, useEffect, useState } from "react";

import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router";

interface PrivateProps {
    children: ReactNode;
}

export function Private({ children }: PrivateProps): JSX.Element | ReactNode {
    const [loading, setLoading] = useState<boolean>(true);
    const [signed, setSigned] = useState<boolean>(false);

    // Verifica se o usuário está autenticado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
                setSigned(true);
            } else {
                setLoading(false);
                setSigned(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) return null;

    if (!signed) return <Navigate to="/login" />;

    return <>{children}</>;
}

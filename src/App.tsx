import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";
import { NetWorks } from "./pages/networks";

import { Private } from "./routes/Private";
import { User } from "./pages/user-page";
import { NotFound } from "./pages/not-found";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/admin",
        element: (
            <Private>
                <Admin />
            </Private>
        ),
    },
    {
        path: "/admin/social",
        element: (
            <Private>
                <NetWorks />
            </Private>
        ),
    },
    {
        path: "/:username",
        element: <User />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/notfound",
        element: <NotFound />,
    },
]);

export { router };

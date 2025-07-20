import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./App";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ToastContainer theme="dark" closeOnClick />
        <RouterProvider router={router} />
    </StrictMode>
);

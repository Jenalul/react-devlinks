import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export function Button({ text, ...rest }: ButtonProps) {
    return (
        <button
            className="bg-blue-600 h-9 rounded-md text-white font-medium cursor-pointer transition-colors hover:bg-blue-500 mb-7"
            {...rest}
        >
            {text}
        </button>
    );
}

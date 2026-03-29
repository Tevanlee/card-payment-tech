"use client";

import clsx from "clsx";

import styles from "./styles/Button.module.css";

import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}

export default function Button({
  children,
  onClick,
  loading = false,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        "flex items-center justify-center gap-2.5 w-full py-2.5 px-4 rounded-full cursor-pointer mt-8 font-medium transition-all duration-300 border border-transparent",
      )}
      role="button"
      disabled={loading}
      onClick={onClick}
    >
      {children}
      {loading && <Loader2 className="animate-spin" size={18} />}
    </button>
  );
}

"use client";

import clsx from "clsx";

import styles from "./styles/Toast.module.css";

interface ToastProps {
  message: string;
  type: "error" | "success";
}

export default function ToastNotification({ message, type }: ToastProps) {
  return (
    <div
      className={clsx(
        styles.toast,
        type === "error" && styles.error,
        type === "success" && styles.success,
        "rounded-xl p-3 text-center text-sm font-medium transform transition-all duration-300",
      )}
    >
      <p>{message}</p>
    </div>
  );
}

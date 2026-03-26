"use client";

import clsx from "clsx";

import styles from "./styles/Form.module.css";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: () => void;
}

export default function Form({ children, onSubmit }: FormProps) {
  const submitForm = async (e: React.SubmitEvent) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <form
      className={clsx(styles.form, "relative w-full max-w-md")}
      onSubmit={submitForm}
    >
      {children}
    </form>
  );
}

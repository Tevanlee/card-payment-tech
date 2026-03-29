"use client";

import clsx from "clsx";

import styles from "./styles/Toggle.module.css";

interface ToggleProps {
  checked: boolean;
  label: string;
  toggleIcon?: React.ReactNode;
  onChange: (state: boolean) => void;
}

export default function Toggler({
  checked,
  toggleIcon,
  label,
  onChange,
}: ToggleProps) {
  return (
    <label
      className={clsx(styles.toggle, "inline-flex items-center cursor-pointer")}
      htmlFor="toggle"
    >
      <input
        className={clsx(styles.toggleInput, "sr-only peer")}
        id="toggle"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        role="switch"
      />

      <div
        className={clsx(
          styles.toggleWrap,
          "relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out",
        )}
      >
        <div
          className={clsx(
            styles.toggleButton,
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-transform duration-200 flex items-center justify-center",
            checked && "translate-x-5",
          )}
        >
          {toggleIcon}
        </div>
      </div>

      {label && <span className="ml-3 text-sm">{label}</span>}
    </label>
  );
}

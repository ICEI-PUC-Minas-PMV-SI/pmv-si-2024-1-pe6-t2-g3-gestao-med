"use client";

import { CircleNotch } from "@phosphor-icons/react";
import styles from "./page.module.css";

interface IButton {
  type?: "button" | "reset" | "submit";
  variant?: "primary" | "secondary";
  loading?: boolean;
  full?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({
  type = "button",
  variant = "primary",
  loading = false,
  full = false,
  disabled = false,
  onClick,
  children,
}: IButton) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`${styles.button} ${styles[variant]} ${
        full ? styles.full : ""
      } ${disabled ? styles.disabled : ""} ${loading ? styles.loading : ""}`}
    >
      {loading ? (
        <CircleNotch size={20} className={styles.loadingIcon} />
      ) : (
        children
      )}
    </button>
  );
}

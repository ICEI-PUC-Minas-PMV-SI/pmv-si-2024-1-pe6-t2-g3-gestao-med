"use client";

import { UserCircle } from "@phosphor-icons/react";
import { formatPhoneNumber } from "../registerUserForm/constants";
import dayjs from "dayjs";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

export function UserData() {

  const session = useSession()

 
  function calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile_icon}>
        <UserCircle size={100} />
      </div>
      <div className={styles.data_box}>
        <h2>{session.data?.user.name || ""}</h2>
        <p>
          {calculateAge(new Date(session.data?.user.date_of_birth || ""))}{" "}
          anos
        </p>
        <hr />
        <p>
          Cadastrado em{" "}
          {dayjs(session.data?.user.created_at || "").format("DD/MM/YYYY")}
        </p>
        <p>Telefone: {formatPhoneNumber(session.data?.user.phone || "")}</p>
      </div>
    </div>
  );
}

"use client";

import { getUserDetails } from "@/app/lib/actions";
import { UserCircle } from "@phosphor-icons/react";
import { useQuery } from "react-query";
import { formatPhoneNumber } from "../registerUserForm/constants";
import dayjs from "dayjs";
import styles from "./page.module.css";

export function UserData() {
  const userDetailsQuery = useQuery(["user-details"], async () => {
    const response = await getUserDetails();
    return response;
  });

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
        <h2>{userDetailsQuery.data?.name || ""}</h2>
        <p>
          {calculateAge(new Date(userDetailsQuery.data?.date_of_birth || ""))}{" "}
          anos
        </p>
        <hr />
        <p>
          Cadastrado em{" "}
          {dayjs(userDetailsQuery.data?.created_at || "").format("DD/MM/YYYY")}
        </p>
        <p>Telefone: {formatPhoneNumber(userDetailsQuery.data?.phone || "")}</p>
      </div>
    </div>
  );
}

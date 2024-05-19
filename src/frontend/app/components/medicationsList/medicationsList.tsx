"use client";

import { CircleNotch, Pencil, Pill } from "@phosphor-icons/react";
import styles from "./page.module.css";
import { useQuery } from "react-query";
import { getUserMedications } from "@/app/lib/actions";
import { IMedication } from "@/app/lib/model";

export function MedicationsList() {
  const medicationsQuery = useQuery(["medications"], async () => {
    const response = await getUserMedications();
    return response;
  });

  function formatHoursString(hoursString: string) {
    const hoursArray = hoursString.split(",");

    const formattedHours = hoursArray.map((hour) => {
      const [hourPart, minutePart] = hour.split(":");
      return minutePart === "00"
        ? `${hourPart}h`
        : `${hourPart}:${minutePart}h`;
    });

    if (formattedHours.length === 1) {
      return formattedHours[0];
    } else if (formattedHours.length === 2) {
      return `${formattedHours[0]} e ${formattedHours[1]}`;
    } else {
      return `${formattedHours.slice(0, -1).join(", ")} e ${
        formattedHours[formattedHours.length - 1]
      }`;
    }
  }

  function calculateLastPillDate(medication: IMedication): string {
    const timeToTakeArray = medication.time_to_take.split(",");
    const dosesPerDay = timeToTakeArray.length;

    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    let dosesLeftToday = 0;
    timeToTakeArray.forEach((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      if (
        hours > currentHours ||
        (hours === currentHours && minutes > currentMinutes)
      ) {
        dosesLeftToday++;
      }
    });

    const remainingStock = medication.stock - dosesLeftToday;
    const daysLast = Math.ceil(remainingStock / dosesPerDay);

    const currentDate = new Date();

    const lastPillDate = new Date(currentDate);
    lastPillDate.setDate(currentDate.getDate() + daysLast);

    const day = String(lastPillDate.getDate()).padStart(2, "0");
    const month = String(lastPillDate.getMonth() + 1).padStart(2, "0");

    return `${day}/${month}`;
  }

  return (
    <div className={styles.medications_container}>
      <h2>Medicamentos</h2>
      <div className={styles.medications_list}>
        {!medicationsQuery.data ||
        medicationsQuery.data.length === 0 ||
        medicationsQuery.isLoading ? (
          <>
            {medicationsQuery.isLoading ? (
              <div className={styles.loading_box}>
                <CircleNotch size={40} className={styles.loadingIcon} />
              </div>
            ) : (
              <p className={styles.emptyMessage}>
                Nenhum medicamento cadastrado ainda...
              </p>
            )}
          </>
        ) : (
          medicationsQuery.data.map((medication, index) => (
            <div key={index}>
              <div className={styles.medication_box}>
                <div className={styles.medication_icon}>
                  <Pill size={50} />
                </div>
                <div className={styles.medication_data}>
                  <div className={styles.medication_name_edit}>
                    <p>{medication.name}</p>
                    <Pencil size={18} />
                  </div>
                  <p className={styles.recurrence}>
                    Todos os dias às{" "}
                    <strong>
                      {formatHoursString(medication.time_to_take)}
                    </strong>{" "}
                    | Até <strong>{calculateLastPillDate(medication)}</strong>
                  </p>
                  <p className={styles.stock}>
                    <strong>{medication.stock}</strong> unidades restantes
                  </p>
                  <div className={styles.learn_more_and_remove}>
                    <p>Saiba mais</p>
                    <p>Remover</p>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

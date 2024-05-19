"use client";

import { Pencil, Pill } from "@phosphor-icons/react";
import styles from "./page.module.css";
import { useQuery } from "react-query";
import { getUserMedications } from "@/app/lib/actions";

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

  return (
    <div className={styles.medications_container}>
      <h2>Medicamentos</h2>
      <div className={styles.medications_list}>
        {!medicationsQuery.data || medicationsQuery.data.length === 0 ? (
          <p className={styles.emptyMessage}>
            Nenhum medicamento cadastrado ainda...
          </p>
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
                    | Até <strong>29/09</strong>
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

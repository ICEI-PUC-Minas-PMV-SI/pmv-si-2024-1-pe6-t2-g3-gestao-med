"use client";

import { useContext } from "react";
import styles from "../../home/home.module.css";
import MedicationBox from "../medications/medicationBox/medicationBox";
import { AppMedicationContext, MedicationProps } from "@/app/context";

export default function HomePage() {
  const { medications, loadingMedications } = useContext(AppMedicationContext);
  const dayOfWeek = (today: Date) => {
    const weekdays = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const index = today.getDay();
    return weekdays[index];
  };

  const date = (today: Date) => {
    const day = today.getDate();
    return day;
  };

  const adjustedDate = () => {
    const today = new Date();

    const weekDay = dayOfWeek(today);
    const dayOfMonth = date(today);

    return (
      <p>
        {weekDay}, {dayOfMonth}
      </p>
    );
  };

  const transformTimeToTakeToArray = (time_to_take: string): string[] => {
    return time_to_take.split(",");
  };

  const compareTimes = (a: string, b: string) => {
    const [hoursA, minutesA] = a.split(":").map(Number);
    const [hoursB, minutesB] = b.split(":").map(Number);

    if (hoursA < hoursB) return -1;
    if (hoursA > hoursB) return 1;
    if (minutesA < minutesB) return -1;
    if (minutesA > minutesB) return 1;
    return 0;
  };

  const groupMedicationsByTime = () => {
    const groupedMeds: { [key: string]: MedicationProps[] } = {};

    medications?.forEach((med) => {
      const { time_to_take, deleted_at } = med;
      const times = transformTimeToTakeToArray(time_to_take);
      if (times && times.length > 0 && !deleted_at) {
        times.forEach((time) => {
          if (!groupedMeds[time]) {
            groupedMeds[time] = [];
          }
          groupedMeds[time].push(med);
        });
      }
    });

    // Ordenando as chaves (horários) em ordem crescente
    const sortedTimes = Object.keys(groupedMeds).sort(compareTimes);
    const sortedGroupedMeds: { [key: string]: MedicationProps[] } = {};
    sortedTimes.forEach((time) => {
      sortedGroupedMeds[time] = groupedMeds[time];
    });

    return sortedGroupedMeds;
  };

  // Função para renderizar os medicamentos agrupados por horário
  const renderMedicationsByTime = () => {
    const groupedMeds = groupMedicationsByTime();

    return Object.keys(groupedMeds).map((time) => (
      <div className={styles.medInfo} key={time}>
        <div className={styles.time}>
          <h3>{time} </h3>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.list}>
          {groupedMeds[time].map((med) => (

            <MedicationBox data={med} time={time} />

          ))}
        </div>
      </div>
    ));
  };
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <h1>Para Hoje</h1>
        {adjustedDate()}
      </div>
      {loadingMedications ?
          "Carregando medicamentos"
          :
          renderMedicationsByTime()
        }
    </section>
  );
}

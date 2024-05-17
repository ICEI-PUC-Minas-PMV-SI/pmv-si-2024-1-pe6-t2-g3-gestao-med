'use client'

import { AppMedicationContext, MedicationProps } from "@/app/context";
import { useContext } from "react";
import styles from './nextMedication.module.css';

export default function NextMedication() {

    const { medications } = useContext(AppMedicationContext);
    const currentHour = new Date().getHours();
    
    // Função para transformar a string de horários em uma array de horários
    const transformTimeToTakeToArray = (time_to_take: string): string[] => {
        return time_to_take.split(",");
    };

    const getNextMedication = (): MedicationProps | null => {
        // Objeto para armazenar medicamentos por horário de tomar
        const medsByTime: { [key: string]: MedicationProps[] } = {};

        // Agrupa os medicamentos pelo horário de tomar
        medications.forEach((med) => {
            const times = transformTimeToTakeToArray(med.time_to_take);
            times.forEach((time) => {
                if (!med.deleted_at) {
                    if (!medsByTime[time]) {
                        medsByTime[time] = [];
                    }
                    medsByTime[time].push(med);
                }
            });
        });

        // Ordena as chaves do objeto (horários de tomar) em ordem crescente
        const sortedTimes = Object.keys(medsByTime).sort();

        // Encontra o próximo horário de tomar após o currentHour
        let nextTime: string | null = null;
        sortedTimes.forEach((time) => {
            const hour = parseInt(time.split(":")[0]);
            if (hour > currentHour && !nextTime) {
                nextTime = time;
            }
        });

        // Se não houver próximo horário de tomar, retorna null
        if (!nextTime) return null;

        // Retorna o primeiro medicamento associado ao próximo horário de tomar
        return medsByTime[nextTime][0];
    };


    const nextMedication = getNextMedication();
    return (
        <div className={styles.container}>
            <p><strong>Próximo medicamento a tomar</strong></p>
            {nextMedication ? (
                <div className={styles.medInfo}>
                    <div className={styles.medication}>
                        <h4>{nextMedication.name}</h4>
                        <p>Horário: {nextMedication.time_to_take.split(',').join(' - ')}</p>
                        {/* Renderize outras informações do medicamento conforme necessário */}
                    </div>
                </div>
            ) : (
                <p>Nenhum medicamento a ser tomado em breve.</p>
            )}
        </div>
    );
}

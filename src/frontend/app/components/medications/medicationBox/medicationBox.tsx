'use client'

import { useEffect, useState } from 'react';
import styles from './medicationBox.module.css';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MedicationProps } from '@/app/context';
import { editMedicationStock, registerMedicationTaken } from '@/app/lib/actions';
import { toast } from 'react-toastify';

type MedicationBoxProps = {
    data: MedicationProps,
    time: string
}

export default function MedicationBox({ data, time }: MedicationBoxProps) {
    const [isTakenToday, setIsTakenToday] = useState(false);

    useEffect(() => {
        const checkIfTakenToday = () => {
            const today = new Date();
            const todayDateStr = today.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

            const takenToday = data.Registers.some(register => {
                const registerDateStr = register.time_taken.split('T')[0];
                const timeString = register.time_taken.split("T")[1];
                const hourTaken = timeString.split(":")[0]
                const minuteTaken = timeString.split(":")[1]
                const registerTimeStr = `${hourTaken}:${minuteTaken}`

                //  // Formato 'HH:MM'
                // console.log("name: ", data.name)
                // console.log("time_taken: ", register.time_taken)
                // console.log("registerDate: ", registerDate)
                // console.log('registerTimeStr: ', registerTimeStr)
                // console.log('time: ', time)
                // console.log("registerDateStrg === todayDateSrt: ", registerDateStr === todayDateStr)
                // console.log('registerTimeStr === time: ', registerTimeStr === time)
                // console.log("register.medication_taken: ", register.medication_taken)
                // console.log("**************")
                return registerDateStr === todayDateStr && registerTimeStr === time && register.medication_taken;
            });

            setIsTakenToday(takenToday);
        };

        checkIfTakenToday();
    }, [data.Registers, time]);

    const handleRegisterMedicationTaken = async () => {
        const [hours, minutes] = time.split(':');
        const now = new Date();
        now.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Ajuste o horário

        // Construa a string ISO manualmente para evitar a conversão para UTC
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const localISOString = `${year}-${month}-${day}T${time}:00Z`;

        if (!isTakenToday) {
            const result = await registerMedicationTaken(data.id, localISOString, true, data.name);

            if (result.status === 201) {
                setIsTakenToday(true);
                
                toast.success(`${data.name} atualizado com sucesso`)

                const result = await editMedicationStock(data.id, data.stock - 1)
                window.location.reload()

            } else {
                toast.error(`Falha ao atualizar ${data.name}`)
            }
        }

        toast.warning("Medicamento já registrado")
    };

    return (
        <div className={`${styles.container}`}>
            <div className={styles.topBox}>
                <div>
                    <label>Tomar </label>
                    <strong>{data.name}</strong>
                </div>
                <IoMdCheckmarkCircleOutline
                    className={`${styles.icon} ${isTakenToday ? styles.taken : styles.notTaken}`}
                    onClick={handleRegisterMedicationTaken}
                />
            </div>
        </div>
    );
}
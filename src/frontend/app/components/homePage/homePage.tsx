'use client'

import styles from '../../home/home.module.css'
import MedicationBox from '../medications/medicationBox/medicationBox'

interface HomePageProps {
    medications: MedicationProps[]
    status: number
}

type MedicationProps = {
    id: string,
    user_id: string,
    name: string,
    description: string,
    stock: 30,
    time_to_take: string,
    treatment_finished_at: string | null,
    created_at: string,
    updated_at: string,
    deleted_at: string | null
}
export default function HomePage(props: HomePageProps) {

    const { medications } = props



    const dayOfWeek = (today: Date) => {
        const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const index = today.getDay();
        return weekdays[index];
    }


    const date = (today: Date) => {
        const day = today.getDate()
        return day
    }

    const adjustedDate = () => {
        const today = new Date()

        const weekDay = dayOfWeek(today)
        const dayOfMonth = date(today)

        return (
            <p>{weekDay}, {dayOfMonth}</p>
        )
    }

    const transformTimeToTakeToArray = (time_to_take: string): string[] => {
        return time_to_take.split(",");
    };

    const groupMedicationsByTime = () => {
        const groupedMeds: { [key: string]: MedicationProps[] } = {};

        medications.forEach((med) => {
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

        return groupedMeds;
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
                        <MedicationBox id={med.id} medName={med.name}/>
                        // <li key={med.id}>{med.name}</li>
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
            {renderMedicationsByTime()}
        </section>
    )
}
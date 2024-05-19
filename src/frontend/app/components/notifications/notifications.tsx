'use client'

import { useContext } from 'react'
import styles from './notifications.module.css'
import { AppMedicationContext } from '@/app/context'
import MedicationBox from './notificationBox/notificationBox'

export default function Notifications() {

    const { medications } = useContext(AppMedicationContext)

    return (
        <div className={styles.container}>
            <h3>Alerta de estoque</h3>

            {medications.length > 0 ?
                <>

                    {medications?.map((med) => (


                        <div key={med.id} className={styles.alerts}>
                            {med.stock <= 3 && !med.deleted_at && !med.treatment_finished_at &&
                                (
                                    <MedicationBox name={med.name} stock={med.stock} />

                                )
                            }
                        </div>

                    ))}
                </>
                :
                <p>Nenhum alerta encontrado</p>
            }
        </div>
    )
}
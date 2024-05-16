'use client'
import styles from './notificationBox.module.css'

type MedicationBoxProps = {
    name: string,
    stock: number
}
export default function NotificationBox(props: MedicationBoxProps){
    return(
        <div className={styles.container}>
            <h3>Estoque</h3>
            <p><strong>{props.name} quase acabando</strong></p>
            <p>Restam <strong>{props.stock} comprimidos</strong></p>
        </div>
    )
}
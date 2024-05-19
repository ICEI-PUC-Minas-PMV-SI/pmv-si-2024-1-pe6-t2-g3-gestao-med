'use client'

import { useContext, useState } from "react";
import AuthLayout from "../(Authenticated)/layout";
import { UserData } from "../components/userData/userData";
import styles from './notifications.module.css'
import { AppMedicationContext } from "../context";
import Modal from "../components/modal/modal";
import Button from "../components/button/button";
import { updateMedicationStock } from "../lib/actions";
import { toast } from "react-toastify";

export default function NotificationsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedMedicationId, setSelectedMedicationId] = useState('')
    const [medicationName, setMedicationName] = useState('')

    const { medications } = useContext(AppMedicationContext)

    const handleOpenModal = async (medicationId: string, medicationName: string) => {
        setSelectedMedicationId(medicationId)
        setMedicationName(medicationName)
        setIsModalOpen(true)
        // const result = await updateMedicationStock(medicationId, stock)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const updateStock = async (formData: FormData) => {
        const stock = formData.get('stock')

        const response = await updateMedicationStock(selectedMedicationId, Number(stock) )

        if(response?.status === 200){
            toast.success("Estoque atualizado com sucesso")
            location.reload()
        }else{
            toast.error("Erro ao atualizar estoque")
        }
    }
    return (
        <AuthLayout>
            <div className={styles.container}>
                <UserData />
                <h1>Alerta de estoque</h1>
                {medications.length > 0 ?
                    <div className={styles.notificationList}>
                        {medications?.map((med) => (
                            <div key={med.id} className={styles.alerts}>
                                {med.stock <= 3 && !med.deleted_at && !med.treatment_finished_at &&
                                    (
                                        <div className={styles.medicationDetails}>
                                            <strong>{med.name}</strong>
                                            <p>Restam apenas <strong>{med.stock}</strong> comprimidos</p>
                                            <div className={styles.actions}>
                                                <p onClick={() => handleOpenModal(med.id, med.name)}>Reabastecer</p>
                                                <p>Remover</p>
                                            </div>
                                            <div className={styles.divider}></div>

                                        </div>

                                    )
                                }
                            </div>

                        ))}
                        <Modal
                            isModalOpen={isModalOpen}
                            onCloseModal={handleCloseModal}
                            modalTitle={medicationName}
                        >
                            <div>
                                <form action={updateStock} className={styles.form}>
                                    <h3>Atualizar estoque</h3>
                                    <input type="number" name="stock" />
                                    <button type="submit">Atualizar</button>
                                </form>
                            </div>
                        </Modal>

                    </div>
                    :
                    <p className={styles.noAlert}>Cadestre novos medicamentos para receber alertas</p>
                }
            </div>

        </AuthLayout>
    )
}
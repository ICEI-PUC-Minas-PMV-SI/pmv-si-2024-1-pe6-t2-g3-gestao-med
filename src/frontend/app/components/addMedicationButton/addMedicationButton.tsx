'use client'

import styles from './addMedication.module.css'
import { useState } from "react";
import Modal from '../modal/modal'
import { RegisterMedicationForm } from '../registerMedicationForm/registerMedicationForm';

export default function AddMedicationButton(){
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

    return (
        <main>
            <div className={styles.button} onClick={() => setIsOpenRegisterModal(true)}>
                Adicionar medicamento
            </div>
            <Modal isModalOpen={isOpenRegisterModal} onCloseModal={() => setIsOpenRegisterModal(false)} modalTitle="Cadastrar medicamento">
                <RegisterMedicationForm closeRegisterModal={() => setIsOpenRegisterModal(false)} />
            </Modal>
        </main>
    );
}
'use client'

import styles from './confirmeMedication.module.css';

export default function ConfirmMedication() {

    async function confirm(formData: FormData) {
        const { dia, hora, ingerido } = Object.fromEntries(formData);

        if (!dia || !hora) {
            alert('Informe a data e a hora da medicação');
            return;
        }

        alert(`Medicamento consumido no dia ${dia}, na hora ${hora}`)
    }

    return (
        <div className={styles.modalContainer}>
            <h2>Medicamento: XYZ</h2>
            <h3>Instrução</h3>
            <p> Blablabla</p>
            <form action={confirm} className={styles.formContainer}>
                <div className={styles.formFields}>
                    <input type="date" id='dia' name='dia' />
                </div>
                <div className={styles.formFields}>
                    <input type="time" id='hora' name='hora' />
                </div>
                <div className={styles.formFields}>
                    <div className={styles.formFields}>
                        <input type="checkbox" id='ingerido' name='ingerido' />
                    </div>
                    <div className={styles.formFields}>
                        <label htmlFor="ingerido">Ingerido</label>
                    </div>
                </div>
            </form>
            <div className={styles.buttonsBox}>
                <button type='submit'>Confirmar</button>
            </div>
        </div>
    );
}
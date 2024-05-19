'use client'

import { useState } from 'react';
import styles from './medicationBox.module.css'
import { MdOutlineArrowCircleDown, MdArrowCircleUp } from "react-icons/md";

type MedicationBoxProps = {
    id: string,
    medName: string
}

export default function MedicationBox(props: MedicationBoxProps) {
    const [boxExpanded, setBoxExpanded] = useState(false)


    return (
        <div className={`${styles.container} ${boxExpanded ? styles.expanded : ''}`}  >
            <div className={styles.topBox}>
                <p key={props.id}>
                    <label htmlFor="">Tomar </label>
                    <strong>{props.medName}</strong>
                </p>
               
            </div>

           
        </div>
    )
}
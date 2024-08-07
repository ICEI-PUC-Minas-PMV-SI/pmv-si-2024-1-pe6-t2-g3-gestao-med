"use client";

import { Pencil, Pill } from "@phosphor-icons/react";
import styles from "./page.module.css";
import { IMedication } from "@/app/lib/model";
import { deleteMedicationAction,  } from "@/app/lib/actions";
import { useContext,  useState } from "react";
import Modal from "../modal/modal";
import { AppMedicationContext, MedicationProps } from "@/app/context";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { RegisterMedicationForm } from "../registerMedicationForm/registerMedicationForm";

export function MedicationsList() {

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  
  const [aiInProgress, setAiInProgress] = useState(false)
  
  const [aiResponse, setAiResponse] = useState<string | null>(null)

  const [medicationName, setMedicationName] = useState('')
  
  const router = useRouter()

  const { medications } = useContext(AppMedicationContext)

  const [medicationEdit, setMedicationEdit] = useState<MedicationProps | null>(null);

  function formatHoursString(hoursString: string) {
    const hoursArray = hoursString.split(",");

    const formattedHours = hoursArray.map((hour) => {
      const [hourPart, minutePart] = hour.split(":");
      return minutePart === "00"
        ? `${hourPart}h`
        : `${hourPart}:${minutePart}h`;
    });

    if (formattedHours.length === 1) {
      return formattedHours[0];
    } else if (formattedHours.length === 2) {
      return `${formattedHours[0]} e ${formattedHours[1]}`;
    } else {
      return `${formattedHours.slice(0, -1).join(", ")} e ${formattedHours[formattedHours.length - 1]
        }`;
    }
  }

  const handleCloseAIModal = () => {
    setIsAIModalOpen(false)
  }

  const handleOpenEditModal = (medication:MedicationProps) => {
    setIsEditModalOpen(true);
    setMedicationEdit(medication);
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setMedicationEdit(null);
  }

  const deleteMedication = async (id: string) => {

    const result = await deleteMedicationAction(id)

    if (result.status === 200) {
      toast.success("Medicamento deletado com sucesso!")
      location.reload()

    } else {
      toast.error("Falha ao deletar medicamento")
    }
  }

  function calculateLastPillDate(medication: IMedication): string {
    const timeToTakeArray = medication.time_to_take.split(",");
    const dosesPerDay = timeToTakeArray.length;

    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    let dosesLeftToday = 0;
    timeToTakeArray.forEach((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      if (
        hours > currentHours ||
        (hours === currentHours && minutes > currentMinutes)
      ) {
        dosesLeftToday++;
      }
    });

    const remainingStock = medication.stock - dosesLeftToday;
    const daysLast = Math.ceil(remainingStock / dosesPerDay);

    const currentDate = new Date();

    const lastPillDate = new Date(currentDate);
    lastPillDate.setDate(currentDate.getDate() + daysLast);

    const day = String(lastPillDate.getDate()).padStart(2, "0");
    const month = String(lastPillDate.getMonth() + 1).padStart(2, "0");

    return `${day}/${month}`;
  }

  return (
    <div className={styles.medications_container}>
      <h2>Medicamentos</h2>
      <div className={styles.medications_list}>
        {medications.length === 0 ? (
          <p className={styles.emptyMessage}>
            Nenhum medicamento cadastrado ainda...
          </p>
        ) : (
          medications.map((medication, index) => (
            <>
              {!medication.deleted_at && (
                <div key={index}>

                  <div className={styles.medication_box}>
                    <div className={styles.medication_icon}>
                      <Pill size={50} />
                    </div>
                    <div className={styles.medication_data}>
                      <div className={styles.medication_name_edit}>
                        <p>{medication.name}</p>
                        <Pencil size={18} onClick={() => handleOpenEditModal(medication)} />
                      </div>
                      <p className={styles.recurrence}>
                        Todos os dias às{" "}
                        <strong>
                          {formatHoursString(medication.time_to_take)}
                        </strong>{" "}
                        | Até <strong>{calculateLastPillDate(medication)}</strong>
                      </p>
                      <p className={styles.stock}>
                        <strong>{medication.stock}</strong> unidades restantes
                      </p>
                      <div className={styles.learn_more_and_remove}>
                        {/* <p onClick={() => handleMedicationAI(medication.name)}>Saiba mais</p> */}
                        <p onClick={() => deleteMedication(medication.id)}>Remover</p>
                      </div>
                    </div>
                  </div>

                  <hr />
                </div>

              )}
            </>
          ))
        )}
      </div>
      {isAIModalOpen && (
        <Modal
          isModalOpen={isAIModalOpen}
          onCloseModal={handleCloseAIModal}
          modalTitle="Saiba mais sobre o seu medicamento"
        >
          <div>
            <p><strong>Nome:</strong> {medicationName}</p>
            {aiInProgress ?
              <div className={styles.aiModal}>
                <h3>As informações serão apresentadas em alguns segundos</h3>
                <Image src='/hourglass.png' width={100} height={100} alt="ampulheta" className={styles.hourglass}></Image>
              </div>
              :
              <div className={styles.aiResponse}>
                {aiResponse}
              </div>
            }
            {/* Adicione outros detalhes conforme necessário */}
          </div>
        </Modal>
      )}

      <Modal isModalOpen={isEditModalOpen} onCloseModal={() => handleCloseEditModal()} modalTitle="Editar medicamento">
        <RegisterMedicationForm medication={medicationEdit} closeRegisterModal={() => handleCloseEditModal()} />
      </Modal>

    </div>
  );
}

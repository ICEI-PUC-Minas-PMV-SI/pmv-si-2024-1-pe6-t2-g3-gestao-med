"use client";

import { Pencil, Pill } from "@phosphor-icons/react";
import styles from "./page.module.css";
import { deleteMedicationAction, getUserMedications } from "@/app/lib/actions";
import { useContext, useState } from "react";
import Modal from "../modal/modal";
import generateMedicationPrompt from "../medications/medicationPrompt/medicationPrompt";
import { AppMedicationContext } from "@/app/context";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function MedicationsList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicationName, setMedicationName] = useState('')
  const router = useRouter()

  const { medications } = useContext(AppMedicationContext)

  // const medicationsQuery = useQuery(["medications"], async () => {
  //   const response = await getUserMedications();
  //   return response;
  // });

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

  const handleMedicationAI = async (name: string) => {
    setIsModalOpen(true)
    setMedicationName(name)

    const promptRequest = await generateMedicationPrompt(name)

    console.log({ promptRequest })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const deleteMedication = async (id: string) => {

    const result = await deleteMedicationAction(id)

    if(result.status === 200){
      toast.success("Medicamento deletado com sucesso!")
      location.reload()
      
    }else{
      toast.error("Falha ao deletar medicamento")
    }
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
                        <Pencil size={18} />
                      </div>
                      <p className={styles.recurrence}>
                        Todos os dias às{" "}
                        <strong>
                          {formatHoursString(medication.time_to_take)}
                        </strong>{" "}
                        | Até <strong>29/09</strong>
                      </p>
                      <p className={styles.stock}>
                        <strong>{medication.stock}</strong> unidades restantes
                      </p>
                      <div className={styles.learn_more_and_remove}>
                        <p onClick={() => handleMedicationAI(medication.name)}>Saiba mais</p>
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
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          onCloseModal={handleCloseModal}
          modalTitle="Medicamento"
        >
          <div>
            <p><strong>Nome:</strong> {medicationName}</p>
            {/* Adicione outros detalhes conforme necessário */}
          </div>
        </Modal>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

import {
  Background,
  Container,
  MedicationsList,
  LoadingOrEmptyMessage,
  MedicationBox,
  MedicationIcon,
  MedicationData,
  MedicationNameEdit,
  MedicationName,
  EditIcon,
  Recurrence,
  Bold,
  Stock,
  LearnMoreAndRemove,
  Remove,
  LoadingBox,
} from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header";
import { Pencil, Pill } from "phosphor-react-native";
import { useIsFocused } from "@react-navigation/native";
import { api } from "../../services/api";
import FooterMenu from "../../components/Menu";

export type MedicationsDTO = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  stock: number;
  time_to_take: string;
  treatment_finished_at: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
};

export default function Medications() {
  const [medications, setMedications] = useState<MedicationsDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    const getMedications = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/medications");
        if (isActive) {
          setMedications(response.data);
        }
      } catch (err: any) {
        if (err?.response.data.error === "Medications not found") {
          console.error("Medications not found");
        }
      } finally {
        setIsLoading(false);
      }
    };
    getMedications();

    return () => {
      isActive = false;
    };
  }, [isFocused]);

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
      return `${formattedHours.slice(0, -1).join(", ")} e ${
        formattedHours[formattedHours.length - 1]
      }`;
    }
  }

  function calculateLastPillDate(medication: MedicationsDTO): string {
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

  const confirmDeleteMedication = (id: string) => {
    Alert.alert(
      "Confirmação de Remoção",
      "Tem certeza de que deseja remover este medicamento?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => deleteMedication(id),
        },
      ]
    );
  };

  const deleteMedication = async (id: string) => {
    try {
      await api.post(`/medication/delete/${id}`);
      setMedications((prevMedications) =>
        prevMedications.filter((med) => med.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete medication", error);
    }
  };

  return (
    <Background>
      <Header title="Medicamentos" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <Container
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
        >
          <MedicationsList>
            {medications.length === 0 ? (
              <>
                {isLoading ? (
                  <LoadingBox>
                    <LoadingOrEmptyMessage>
                      Carregando medicamentos...
                    </LoadingOrEmptyMessage>
                  </LoadingBox>
                ) : (
                  <LoadingOrEmptyMessage>
                    Nenhum medicamento cadastrado ainda...
                  </LoadingOrEmptyMessage>
                )}
              </>
            ) : (
              medications.map(
                (medication, index) =>
                  !medication.deleted_at && (
                    <MedicationBox key={index}>
                      <MedicationIcon>
                        <Pill size={50} />
                      </MedicationIcon>
                      <MedicationData>
                        <MedicationNameEdit>
                          <MedicationName>{medication.name}</MedicationName>
                          <EditIcon
                          // onPress={handleOpenEditModal}
                          >
                            <Pencil size={18} />
                          </EditIcon>
                        </MedicationNameEdit>
                        <Recurrence>
                          Todos os dias às{" "}
                          <Bold>
                            {formatHoursString(medication.time_to_take)}
                          </Bold>{" "}
                          | Até <Bold>{calculateLastPillDate(medication)}</Bold>
                        </Recurrence>
                        <Stock>
                          <Bold>{medication.stock}</Bold> unidades restantes
                        </Stock>
                        <LearnMoreAndRemove>
                          {/* <LearnMore onPress={() => handleMedicationAI(medication.name)}>Saiba mais</LearnMore> */}
                          <Remove
                          onPress={() => confirmDeleteMedication(medication.id)}
                          >
                            Remover
                          </Remove>
                        </LearnMoreAndRemove>
                      </MedicationData>
                    </MedicationBox>
                  )
              )
            )}
          </MedicationsList>
        </Container>
      </KeyboardAwareScrollView>
      <FooterMenu />
    </Background>
  );
}

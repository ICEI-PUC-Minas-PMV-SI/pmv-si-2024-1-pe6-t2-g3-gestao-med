import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import {
  Background,
  Divider,
  HighlightedDivider,
  HighlightedLabel,
  Label,
  ListMedications,
  MedicationBox,
  MedicationsList,
  TimeBox,
} from "./styles";
import { api } from "../../services/api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import MedicationItem from "../../components/MedicationItem";
import FooterMenu from "../../components/Menu";
import * as Notifications from 'expo-notifications';

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

export default function Home() {
  const [medications, setMedications] = useState<MedicationsDTO[] | []>([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation<any>();

  useEffect(() => {
    let isActive = true;

    const getMedications = async () => {
      try {
        const response = await api.get("/medications");
        if (isActive) {
          setMedications(response.data);
          checkStockAndNotify(response.data);
          scheduleNextMedicationNotification(response.data);
        }
      } catch (err: any) {
        if (err?.response.data.error === "Medications not found") {
          console.error("Medications not found");
        }
      }
    };
    getMedications();

    return () => {
      isActive = false;
    };
  }, [isFocused]);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const medicationId = response.notification.request.content.data.medicationId;

      if (medicationId) {
        navigation.navigate('Editar medicamento', { medicationId: medicationId });
      }
    });

    return () => subscription.remove();
  }, []);

  const checkStockAndNotify = (medications: MedicationsDTO[]) => {
    medications.forEach(async (med) => {
      if (med.stock < 3) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Atenção",
            body: `O medicamento ${med.name} está com estoque baixo (${med.stock} unidades).`,
            data: { medicationId: med.id },
          },
          trigger: {
            seconds: 1,
          },
        });
      }
    });
  };

  const scheduleNextMedicationNotification = async (medications: MedicationsDTO[]) => {
    const groupedMeds = groupMedicationsByTime(medications);
    const currentTime = currentTimeString();
    const times = Object.keys(groupedMeds);
    const nextTime = getNextTime(currentTime, times);
    if (nextTime) {
      const nextMedications = groupedMeds[nextTime];
      const nextMedicationNames = nextMedications.map(med => med.name).join(", ");

      const [nextHour, nextMinute] = nextTime.split(":").map(Number);
      const now = new Date();
      const nextNotificationDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nextHour, nextMinute);

      if (nextNotificationDate > now) {
        
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Próximo Medicamento",
            body: `Está na hora de tomar: ${nextMedicationNames}`,
            data: { nextTime },
          },
          trigger: {
            date: nextNotificationDate
          },
        });
      }
    }
  };

  const groupMedicationsByTime = (medications: MedicationsDTO[]) => {
    const groupedMeds: { [key: string]: MedicationsDTO[] } = {};
    medications?.forEach((med) => {
      const times = med.time_to_take.split(",");
      if (times && times.length > 0 && !med.deleted_at) {
        times.forEach((time) => {
          if (!groupedMeds[time]) {
            groupedMeds[time] = [];
          }
          groupedMeds[time].push(med);
        });
      }
    });

    const sortedTimes = Object.keys(groupedMeds).sort((a, b) => {
      const [aHour, aMinute] = a.split(":").map(Number);
      const [bHour, bMinute] = b.split(":").map(Number);
      return aHour * 60 + aMinute - (bHour * 60 + bMinute);
    });

    const sortedGroupedMeds: { [key: string]: MedicationsDTO[] } = {};
    sortedTimes.forEach((time) => {
      sortedGroupedMeds[time] = groupedMeds[time];
    });

    return sortedGroupedMeds;
  };

  const currentTimeString = () => {
    const getCurrentTime = new Date();
    const hour = getCurrentTime.getHours();
    const minutes = getCurrentTime.getMinutes();

    return `${hour}:${minutes}`;
  };

  const getNextTime = (currentTime: string, times: string[]): string | null => {
    let closestTime: string | null = null;
    let closestDifference = Infinity;

    const [currentHour, currentMinute] = currentTime.split(":").map(Number);
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    for (const time of times) {
      const [hour, minute] = time.split(":").map(Number);
      const totalMinutes = hour * 60 + minute;

      // Calculate the difference between the times
      const difference = totalMinutes - currentTotalMinutes;

      // If the difference is positive and smaller than the closest difference, update the closest time
      if (difference > 0 && difference < closestDifference) {
        closestDifference = difference;
        closestTime = time;
      }
    }

    // If no future time is found, wrap around to the next day's first time
    if (!closestTime && times.length > 0) {
      closestTime = times[0];
    }

    return closestTime;
  };

  

  const renderMedicationsByTime = () => {
    const groupedMeds = groupMedicationsByTime(medications);

    const data = Object.keys(groupedMeds);

    const currentTime = currentTimeString();
    const nextTime = getNextTime(currentTime, data);

    return Object.keys(groupedMeds).map((time) => (
      <ListMedications key={time}>
        <TimeBox>
          {time === nextTime ? (
            <>
              <HighlightedLabel>{time}</HighlightedLabel>
              <HighlightedDivider />
            </>
          ) : (
            <>
              <Label>{time}</Label>
              <Divider />
            </>
          )}
        </TimeBox>
        <MedicationBox>
          {groupedMeds[time].map((med) => (
            <MedicationItem key={med.id} id={med.id} medName={med.name} />
          ))}
        </MedicationBox>
      </ListMedications>
    ));
  };

  return (
    <Background>
      <Header
        title={`Para Hoje: ${new Date().toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
        })}`}
      />
      <MedicationsList>
        {medications.length === 0 || !medications ? (
          <ListMedications>
            <Label>Nenhum medicamento encontrado</Label>
          </ListMedications>
        ) : (
          <>{renderMedicationsByTime()}</>
        )}
        {/* {renderMedicationsByTime()} */}
      </MedicationsList>
      <FooterMenu />
    </Background>
  );
}
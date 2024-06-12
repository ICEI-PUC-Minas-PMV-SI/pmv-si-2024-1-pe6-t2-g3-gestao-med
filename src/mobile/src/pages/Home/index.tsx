import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import Header from "../../components/Header";
import { Background, Divider, HighlightedDivider, HighlightedLabel, Label, ListMedications, MedicationBox, TimeBox } from './styles'
import { api } from '../../services/api';
import { useIsFocused } from '@react-navigation/native'
import MedicationItem from '../../components/MedicationItem';
import MedicationAlert from '../../components/MedicationAlert';

export type MedicationsDTO = {
  id: string
  user_id: string
  name: string
  description: string
  stock: number
  time_to_take: string
  treatment_finished_at: Date | null
  created_at: Date | null
  updated_at: Date | null
  deleted_at: Date | null
}

export default function Home() {
  const { signOut } = useContext(AuthContext)
  const [medications, setMedications] = useState<MedicationsDTO[] | []>([])
  const isFocused = useIsFocused()

  useEffect(() => {
    let isActive = true

    const getMedications = async () => {
      try {
        const response = await api.get('/medications')
        if (isActive) {
          setMedications(response.data)
        }
      } catch (err: any) {
        if (err?.response.data.error === "Medications not found") {
          console.error("Medications not found")
        }
      }
    }
    getMedications()

    return () => { isActive = false }
  }, [isFocused])

  const groupMedicationsByTime = () => {
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

    const sortedTimes = Object.keys(groupedMeds).sort();
    const sortedGroupedMeds: { [key: string]: MedicationsDTO[] } = {};
    sortedTimes.forEach((time) => {
      sortedGroupedMeds[time] = groupedMeds[time];
    });

    return sortedGroupedMeds;
  };


  const currentTimeString = () => {
    const getCurrentTime = new Date()
    const hour = getCurrentTime.getHours()
    const minutes = getCurrentTime.getMinutes()

    return `${hour}:${minutes}`
  }

  const getNextTime = (currentTime: string, times: string[]): string | null => {
    let closestTime: string | null = null;
    let closestDifference = Infinity;

    const [currentHour, currentMinute] = currentTime.split(':').map(Number);
    const currentTotalMinutes = currentHour * 60 + currentMinute;

    for (const time of times) {
      const [hour, minute] = time.split(':').map(Number);
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

  const renderGroupedMedications = () => {
    const groupedMedications = groupMedicationsByTime();
    const data = Object.keys(groupedMedications).map(time => ({
      time,
      medications: groupedMedications[time]
    }));

    const currentTime = currentTimeString()

    let timeArray: string[] = []

    data.forEach((item) => {
      timeArray.push(item.time)
    })



    return data.map(({ time, medications }) => (
      <ListMedications key={time}>

      </ListMedications>
    ));
  };

  const renderMedicationsByTime = () => {
    const groupedMeds = groupMedicationsByTime();

    const data = Object.keys(groupedMeds)

    const currentTime = currentTimeString()
    const nextTime = getNextTime(currentTime, data)


    return Object.keys(groupedMeds).map((time) => (
      <ListMedications key={time}>
        <TimeBox >
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
        <MedicationBox >
          {groupedMeds[time].map((med) => (
            <MedicationItem id={med.id} medName={med.name} />
          ))}
        </MedicationBox>
      </ListMedications>
    ));
  };

  return (
    <Background>
      <Header title={`Para Hoje: ${new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric' })}`} />
      {renderMedicationsByTime()}
      <MedicationAlert />
    </Background>
  );
}


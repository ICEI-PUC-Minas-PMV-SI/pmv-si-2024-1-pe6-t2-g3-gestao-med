"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { getMedications } from "../lib/actions";

type ContextMedicationData = {
  medications: MedicationProps[];
  loadingMedications: boolean
};

export type MedicationProps = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  stock: number;
  time_to_take: string;
  treatment_finished_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  Registers: MedicationRegisters[]
};

export type MedicationRegisters = {
  id: string
  user_id: string
  medication_id: string
  medication_name: string
  medication_taken: boolean
  time_taken: string
  created_at: Date
  updated_at: Date
}
export const AppMedicationContext = createContext({} as ContextMedicationData);

export  function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [medications, setMedications] = useState<MedicationProps[]>([]);
  const [loadingMedications, setLoadingMedications] = useState(true)

  const medicationsRequest = async () => {
    const { status, data } = await getMedications()
    if (status === 200) {
      setMedications(data)
  
    }

    setLoadingMedications(false)

  }

  useEffect(() => {
    medicationsRequest()
  }, [])
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppMedicationContext.Provider value={{medications, loadingMedications} }>
        {children}
      </AppMedicationContext.Provider>
    </QueryClientProvider>
  );
}

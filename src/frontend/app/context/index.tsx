"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { getMedications } from "../lib/actions";

type ContextMedicationData = {
  medications: MedicationProps[];
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
};

export const AppMedicationContext = createContext({} as ContextMedicationData);

export  function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [medications, setMedications] = useState<MedicationProps[]>([]);

  const medicationsRequest = async () => {

    const { status, data } = await getMedications()
    if (status === 200) {
      setMedications(data)
  
    }
  }

  useEffect(() => {
    medicationsRequest()
  }, [])
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppMedicationContext.Provider value={{medications} }>
        {children}
      </AppMedicationContext.Provider>
    </QueryClientProvider>
  );
}

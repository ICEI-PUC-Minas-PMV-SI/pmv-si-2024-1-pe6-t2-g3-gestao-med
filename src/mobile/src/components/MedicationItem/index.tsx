import { useEffect, useState } from "react";
import { ButtonBox, Container, Label } from "./styles";
import { MedicationsDTO } from "../../pages/Home";
import Icon from 'react-native-vector-icons/AntDesign'
import { api } from "../../services/api";

type MedicationBoxProps = {
    data: MedicationsDTO,
    time: string
}



export default function MedicationItem({ data, time }: MedicationBoxProps) {
    const [isTakenToday, setIsTakenToday] = useState(false);

    useEffect(() => {
        const checkIfTakenToday = () => {
            const today = new Date();
            const todayDateStr = today.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

            const takenToday = data.Registers.some(register => {
                const registerDateStr = register.time_taken.split('T')[0];
                const timeString = register.time_taken.split("T")[1];
                const hourTaken = timeString.split(":")[0]
                const minuteTaken = timeString.split(":")[1]
                const registerTimeStr = `${hourTaken}:${minuteTaken}`

                return registerDateStr === todayDateStr && registerTimeStr === time && register.medication_taken;
            });

            setIsTakenToday(takenToday);
        };

        checkIfTakenToday();
    }, [data.Registers, time]);

    const handleRegisterMedicationTaken = async () => {
        const [hours, minutes] = time.split(':');
        const now = new Date();
        now.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Ajuste o horário

        // Construa a string ISO manualmente para evitar a conversão para UTC
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const localISOString = `${year}-${month}-${day}T${time}:00Z`;

        if (!isTakenToday) {
            const result = await api.post('/medication/taken', {
                medication_id: data.id,
                time_taken: localISOString,
                medication_taken: true,
                medication_name: data.name
            }) 

            if (result.status === 201) {
                
                await api.put('/medication/edit', {
                    id: data.id,
                    stock: data.stock - 1
                })
                setIsTakenToday(true);
            

        } else {
            alert("Medicamento já registrado")
            // toast.error(`Falha ao atualizar ${data.name}`)
        }
    }
    }
    // toast.warning("Medicamento já registrado")

    return (
        <Container>
            <ButtonBox onPress={() => handleRegisterMedicationTaken()}>
                <Label>
                    {data.name}
                </Label>
                <Icon name='checkcircleo' size={20} color={isTakenToday ? "green" : 'red'}></Icon>
            </ButtonBox>

        </Container>
    )
}

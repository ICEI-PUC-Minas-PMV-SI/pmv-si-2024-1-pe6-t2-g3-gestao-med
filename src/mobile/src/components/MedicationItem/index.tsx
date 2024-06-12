import { Container, Label } from "./styles";
import { Text } from "react-native";

type MedicationItemProps = {
    id: string
    medName: string
}
export default function MedicationItem({ id, medName }: MedicationItemProps) {


    return (
        <Container>
            <Label>
                {medName}
            </Label>

        </Container>
    )
}

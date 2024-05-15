import AuthLayout from "../(Authenticated)/layout";
import Medications from "../components/medications/medications";

export default function Medicamentos() {
    return (
        <AuthLayout>
            <Medications />
        </AuthLayout>
    )
}
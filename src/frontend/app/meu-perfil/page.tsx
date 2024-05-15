import AuthLayout from "../(Authenticated)/layout";
import UsuarioComponent from "../components/userPage/userPage";

export default function MyProfile() {
    return (
        <AuthLayout>
            <UsuarioComponent />
        </AuthLayout>
    )
}
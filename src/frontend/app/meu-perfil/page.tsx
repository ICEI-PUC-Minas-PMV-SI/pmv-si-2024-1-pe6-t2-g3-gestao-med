import AuthLayout from "../(Authenticated)/layout";
import UsuarioComponent from "../components/userPage/userPage";
import { getUserDetails } from "../lib/actions";

export default async function MyProfile() {


    return (
        <AuthLayout>
            <UsuarioComponent />
        </AuthLayout>
    )
}



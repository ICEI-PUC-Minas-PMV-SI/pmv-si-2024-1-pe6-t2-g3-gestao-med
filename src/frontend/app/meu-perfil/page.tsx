import AuthLayout from "../(Authenticated)/layout";
import UsuarioComponent from "../components/userPage/userPage";
import { getUserDetails } from "../lib/actions";

export default async function MyProfile() {

   
    const userDetails = await getUserDetails()
   

    return (
        <AuthLayout>
            <UsuarioComponent user={userDetails}/>
        </AuthLayout>
    )
}
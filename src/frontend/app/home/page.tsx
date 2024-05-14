import HomePage from "../components/homePage/homePage"
import { getMedications, getUserDetails } from "../lib/actions"
import AuthLayout from "../(Authenticated)/layout"

export default async function Home (){
   
    // const user = await getUserDetails()
    const { status, data } = await getMedications()

    return(
        <AuthLayout>
            <HomePage medications={data} status={status}/>
        </AuthLayout>
    )
}
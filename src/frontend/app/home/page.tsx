import HomePage from "../components/homePage/homePage"
import { getUserDetails } from "../lib/actions"
import AuthLayout from "../(Authenticated)/layout"

export default async function Home (){
   
    const user = await getUserDetails()
    
    return(
        <AuthLayout>
            <HomePage />
        </AuthLayout>
    )
}
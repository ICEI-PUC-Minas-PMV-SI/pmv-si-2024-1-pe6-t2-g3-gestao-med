import HomePage from "../components/homePage/homePage"
import AuthLayout from "../(Authenticated)/layout"

export default async function Home (){
   

    return(
        <AuthLayout>
            <HomePage />
        </AuthLayout>
    )
}
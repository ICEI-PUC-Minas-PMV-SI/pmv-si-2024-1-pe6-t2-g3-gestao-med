import { useState } from "react"
import HomePage from "../components/homePage/homePage"
import { getUserDetails } from "../lib/actions"
import { setupAPIClient } from "../services/api"

export default async function Home (){
   
    const user = await getUserDetails()
    
    return(
        <main>
            <HomePage />
        </main>
    )
}
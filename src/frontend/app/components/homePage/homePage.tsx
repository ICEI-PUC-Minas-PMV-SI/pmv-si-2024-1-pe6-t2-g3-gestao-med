'use client'

import { setupAPIClient } from "@/app/services/api";
import LogOutButton from "../logOutButton/logOutButton";
import { getUserDetails } from "@/app/lib/actions";
import { useEffect } from "react";

export default function HomePage() {

    
    async function getUserDetailsaaa() {
         const user = await getUserDetails()
        console.log({user})
    }

    return (
        <>
            <h1>Página Inicial</h1>
            <LogOutButton />
            <div onClick={getUserDetailsaaa}>buscar dados</div>
        </>
    )
}
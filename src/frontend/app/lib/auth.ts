import {setupAPIClient } from "@/app/services/api"
import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from "./auth.config";

const baseURL = process.env.BASE_URL as string

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },

            async authorize(credentials) {
                const api = await setupAPIClient()
                try {

                    const response = await api.post("/session", {
                        email: credentials?.email,
                        password: credentials?.password
                    })
                    const user = await response.data

                    if (user) {
                        const headers = {
                            Authorization: `Bearer ${user.token}`
                        };
                        
                        try {
                            const userDataResponse = await fetch(`${baseURL}/user`, {
                                method: 'GET',
                                headers: headers
                            });
                            if (!userDataResponse.ok) {
                                throw new Error('Network response was not ok');
                            }
                            const userData = await userDataResponse.json();

                            // Atribuição dos dados de userData a user
                            user.uuid = userData.id;
                            user.is_admin = userData.isAdmin;
                            user.email = userData.email;
                            user.name = userData.name;
                            user.phone = userData.phone;
                            user.date_of_birth = userData.date_of_birth;
                            user.gender = userData.gender;
                            user.created_at = userData.created_at

                            return user;
                        } catch (error) {
                            console.error('Error fetching user data:', error);
                            return null;
                        }
                        
                    }

                    return null
                } catch (err) {

                    console.log("Login Error: ", err)
                    return
                }
            }

        })
    ],
    callbacks: {
        
        ...authConfig.callbacks
    }
})


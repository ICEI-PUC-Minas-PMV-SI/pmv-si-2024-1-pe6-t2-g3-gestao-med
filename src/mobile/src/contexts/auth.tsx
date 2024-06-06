import React, { createContext, useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";

type UserProps = {
    id: string,
    name: string,
    email: string,
    date_of_birth: string,
    gender: string,
    token: string,
    created_at: string | null
}

interface AuthContextData {
    //user: { name: string };
    signed: boolean
    loadingAuth: boolean
    loading: boolean
    signUp: (name: string, email: string, password: string, gender: string, date_of_birth: string) => void;
    signIn: (email: string, password: string) => void;
    signOut: () => void
}
export const AuthContext = createContext({} as AuthContextData)

type AuthContextProps = {
    children: React.ReactNode
}
function AuthProvider({ children }: AuthContextProps) {

    const [user, setUser] = useState<UserProps | null>(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('@medToken')
            if (storageUser) {

                try {
                    const response = await api.get('/user', {
                        headers: {
                            'Authorization': `Bearer ${storageUser}`
                        }
                    })

                    api.defaults.headers['Authorization'] = `Bearer ${storageUser}`
                    setUser(response.data)
                    
                    setLoading(false)

                } catch (err: any) {
                    console.log("Erro ao buscar dados do usuário", err)
                    setUser(null)
                    setLoading(false)
                }

                
            }
            setLoading(false)



        }

        loadStorage()
        
    }, [])

    async function signUp(name: string, email: string, password: string, gender: string, date_of_birth: string) {
        setLoadingAuth(true)

        try {
            const response = await api.post("/user", {
                name,
                email,
                password,
                gender,
                date_of_birth
            })
            setLoadingAuth(false)
            navigation.goBack()

        } catch (err: any) {
            setLoadingAuth(false)

            console.log("Erro ao cadastrar", err)
        }
        setLoadingAuth(false)
    }

    async function signIn(email: string, password: string) {
        setLoadingAuth(true)

        try {
            const response = await api.post("/session", {
                email,
                password
            })

            const { id, name, date_of_birth, gender, token } = response.data

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            await AsyncStorage.setItem('@medToken', token)

            setUser({
                id,
                name,
                date_of_birth,
                email,
                gender,
                token,
                created_at: null,
            })


        } catch (err: any) {
            console.log("Erro ao logar: ", err)
            setLoadingAuth(false)
        }

    }

    async function signOut(){
        await AsyncStorage.clear()
        .then(() => {
            setUser(null)
            setLoadingAuth(false)
        
        })
    }
    return (
        <AuthContext.Provider value={{ signed: !!user, signUp, loadingAuth, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
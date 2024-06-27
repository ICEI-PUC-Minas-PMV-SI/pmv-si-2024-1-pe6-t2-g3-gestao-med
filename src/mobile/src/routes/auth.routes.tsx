import React, { useContext } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

function AuthRoutes() {
    const AuthStack = createNativeStackNavigator()

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    headerShown: false
                }}
            />

            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerStyle: {
                        backgroundColor: '#075281',

                    },
                    headerTintColor: '#FFF',
                    headerTitle: 'Voltar',
                    headerBackTitleVisible: false
                }}
            />
            

        </AuthStack.Navigator>
    )
}

export default AuthRoutes
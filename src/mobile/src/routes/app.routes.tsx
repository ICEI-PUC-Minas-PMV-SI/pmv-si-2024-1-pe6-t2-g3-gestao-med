import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from '../pages/Home'
import User from "../pages/User";

const AppDrawer = createDrawerNavigator()

function AppRoutes() {
    return (
        <AppDrawer.Navigator
            screenOptions={
                {
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: '#00B4D8',
                        paddingTop: 20
                    },

                    drawerActiveBackgroundColor: '#6163ce',
                    drawerActiveTintColor: '#FFF',

                    drawerInactiveBackgroundColor: "F0F2FF",
                    drawerInactiveTintColor: '#838181'
                }
            }
        >
            <AppDrawer.Screen
                name="Home"
                component={Home}
            />

            <AppDrawer.Screen
                name="User"
                component={User}
            />

        </AppDrawer.Navigator>
    )
}

export default AppRoutes
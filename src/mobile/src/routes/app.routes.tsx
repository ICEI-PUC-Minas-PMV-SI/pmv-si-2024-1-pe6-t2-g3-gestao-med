import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../pages/Home";
import User from "../pages/User";
import CustomDrawerContent from "../components/CustomDrawer";
import Medications from "../pages/Medications";

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
  return (
    <AppDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#2585C0",
          paddingTop: 20,
        },

        drawerActiveBackgroundColor: "#075281",
        drawerActiveTintColor: "#FFF",

        drawerInactiveBackgroundColor: "#6eafd8",
        drawerInactiveTintColor: "#000000",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <AppDrawer.Screen name="Home" component={Home} />
      <AppDrawer.Screen name="Perfil" component={User} />
      <AppDrawer.Screen name="Medicamentos" component={Medications} />
    </AppDrawer.Navigator>
  );
}

export default AppRoutes;

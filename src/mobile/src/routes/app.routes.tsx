// routes/app.routes.tsx
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Medication from "../pages/Medication";
import User from "../pages/User";
import CustomDrawerContent from "../components/CustomDrawer";
import Medications from "../pages/Medications";
import EditMedicate from "../pages/EditMedications";

const AppDrawer = createDrawerNavigator();
const AppStack = createNativeStackNavigator();

function AppStackScreen() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Perfil" component={User} />
      <AppStack.Screen name="Medicamentos" component={Medications} />
      <AppStack.Screen name="Cadastrar medicamento" component={Medication} />
      <AppStack.Screen name="Editar medicamento" component={EditMedicate} />
    </AppStack.Navigator>
  );
}

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
      <AppDrawer.Screen name="Home" component={AppStackScreen} />
      <AppDrawer.Screen name="Perfil" component={User} />
      <AppDrawer.Screen name="Medicamentos" component={Medications} />
      {/* <AppDrawer.Screen name="Cadastrar medicamento" component={Medication} /> */}
    </AppDrawer.Navigator>
  );
}

export default AppRoutes;

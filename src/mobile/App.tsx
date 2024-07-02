import 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications'

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import Routes from './src/routes/index'

import AuthProvider from './src/contexts/auth';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const handleCallNotifications = async () => {
    const {status} = await Notifications.getPermissionsAsync()

    if(status !== 'granted'){
      alert("Permissões de notificações bloqueadas!")
      return 
    }

    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "Olá",
    //     body: "Não esqueça de tomar seus medicamentos"
    //   },
    //   trigger:{
    //     seconds: 2
    //   }
    // })
  }

  useEffect(() => {
    handleCallNotifications()
  }, [])


  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#F0F4FF' barStyle='dark-content' />
        <Routes />
      </AuthProvider >
    </NavigationContainer>
  )
}



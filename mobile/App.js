import { StatusBar } from 'expo-status-bar';
import React from 'react';


import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Loading } from './src/components/Loading';
import { THEME } from './src/theme';
import { NativeBaseProvider } from 'native-base';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />


      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>

    </NativeBaseProvider>

  );
}


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: colors.gold,
          background: colors.carbon950,
          card: colors.carbon900,
          text: colors.text,
          border: colors.line,
          notification: colors.gold,
        },
      }}
    >
      <StatusBar style="light" />
      <AppNavigator />
    </NavigationContainer>
  );
}

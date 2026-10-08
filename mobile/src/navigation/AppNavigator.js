import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import BikeProfileScreen from '../screens/BikeProfileScreen';
import BookingScreen from '../screens/BookingScreen';
import PartsCatalogScreen from '../screens/PartsCatalogScreen';
import TrackingScreen from '../screens/TrackingScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabIcon = (label) => ({ color }) => (
  <Text style={{ color, fontSize: 18 }}>{label}</Text>
);

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.carbon900,
          borderTopColor: colors.line,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ tabBarIcon: tabIcon('⌂') }}
      />
      <Tab.Screen
        name="Mi Moto"
        component={BikeProfileScreen}
        options={{ tabBarIcon: tabIcon('◈') }}
      />
      <Tab.Screen
        name="Citas"
        component={BookingScreen}
        options={{ tabBarIcon: tabIcon('▣') }}
      />
      <Tab.Screen
        name="Repuestos"
        component={PartsCatalogScreen}
        options={{ tabBarIcon: tabIcon('⚙') }}
      />
      <Tab.Screen
        name="Rastreo"
        component={TrackingScreen}
        options={{ tabBarIcon: tabIcon('◉') }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={HomeTabs} />
    </Stack.Navigator>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

// pages
import BluetoothConnections from './pages/BluetoothConnection/index';
import RemoteControl from './pages/RemoteControl';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="BluetoothConnections"
            component={BluetoothConnections}
            options={{ title: 'Conexões disponíveis' }}
          />
          <Stack.Screen
            name="RemoteControl"
            component={RemoteControl}
            options={{ title: 'Controle Remoto' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

/**
 * App Navigator - Stack navigation for OTP and Chat screens
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OTPScreen } from '../screens/OTPScreen/OTPScreen';
import { ChatScreen } from '../screens/ChatScreen/ChatScreen';
import { ChatProvider } from '../context/ChatContext';
import { MOCK_MESSAGES } from '../utils/mockData';

export type RootStackParamList = {
  OTPScreen: undefined;
  ChatScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChatScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ChatScreen"
          options={{
            headerShown: false,
          }}
        >
          {() => (
            <ChatProvider initialMessages={MOCK_MESSAGES}>
              <ChatScreen />
            </ChatProvider>
          )}
        </Stack.Screen>
        <Stack.Screen name="OTPScreen">
          {({ navigation }) => (
            <OTPScreen
              onVerificationSuccess={() => {
                navigation.navigate('ChatScreen');
              }}
              email="example@gmail.com"
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

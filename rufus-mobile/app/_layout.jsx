import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="landing">
        <Stack.Screen name="landing" />
        <Stack.Screen name="login" />
        <Stack.Screen name="loan-application" />
        <Stack.Screen name="identity-verification" />
        <Stack.Screen name="application-success" />
        <Stack.Screen name="loaner" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

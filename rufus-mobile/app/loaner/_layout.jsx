import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export default function LoanerLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.borderLight,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: Colors.background,
          borderBottomColor: Colors.borderLight,
          borderBottomWidth: 1,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: { fontWeight: '700', color: Colors.textPrimary },
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerTitle: 'RUFUS — Dashboard',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Payments',
          headerTitle: 'Payment Schedule',
          tabBarLabel: 'Payments',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: 'Documents',
          headerTitle: 'Document Submission',
          tabBarLabel: 'Docs',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qr-profile"
        options={{
          title: 'QR Profile',
          headerTitle: 'My RUFUS ID',
          tabBarLabel: 'QR',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          headerTitle: 'Alerts & Notifications',
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

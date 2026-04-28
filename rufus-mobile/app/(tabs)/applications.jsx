import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export default function ApplicationsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.center}>
        <Ionicons name="document-text-outline" size={56} color={Colors.slate300} />
        <Text style={styles.heading}>Applications Module</Text>
        <Text style={styles.sub}>
          Full application management and history coming soon.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.slate50 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.slate700,
    marginTop: 16,
  },
  sub: {
    fontSize: 14,
    color: Colors.slate500,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
});

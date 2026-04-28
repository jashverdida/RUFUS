import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCard from '../../components/StatCard';
import QueueItem from '../../components/QueueItem';
import { mockApplications } from '../../data/mockApplications';
import { Colors } from '../../constants/colors';

export default function DashboardScreen() {
  const router = useRouter();

  const queueSize = mockApplications.length;
  const approvedToday = mockApplications.filter(
    (a) => a.aiStatus === 'Pre-Approved'
  ).length;
  const needsReview = mockApplications.filter(
    (a) => a.aiStatus === 'Review Needed' || a.aiStatus === 'Needs Manual Review'
  ).length;

  const handleRowPress = (item) => {
    router.push(`/detail/${item.id}`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.statsRow}>
          <StatCard
            title="Queue Size"
            value={queueSize}
            subtitle="+2 since yesterday"
            accentColor={Colors.primary}
          />
          <StatCard
            title="Approved Today"
            value={approvedToday}
            subtitle="50% approval rate"
            accentColor={Colors.green}
          />
          <StatCard
            title="Needs Review"
            value={needsReview}
            subtitle="Awaiting manual assessment"
            accentColor={Colors.yellow}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Underwriting Queue</Text>
          <Text style={styles.sectionSub}>
            {mockApplications.length} applications pending review
          </Text>
        </View>

        {mockApplications.map((item) => (
          <QueueItem key={item.id} item={item} onPress={handleRowPress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.slate50 },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 32 },
  statsRow: { flexDirection: 'row', marginBottom: 20 },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.slate900,
  },
  sectionSub: {
    fontSize: 12,
    color: Colors.slate500,
    marginTop: 2,
  },
});

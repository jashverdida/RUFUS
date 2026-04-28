import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getScoreColor, Colors } from '../constants/colors';

export default function ScoreCircle({ score }) {
  const { stroke, text } = getScoreColor(score > 0 ? score : 1);
  const label = score > 80 ? 'Strong' : score >= 50 ? 'Moderate' : score === 0 ? 'Pending' : 'Needs Review';

  return (
    <View style={styles.wrapper}>
      <View style={[styles.circle, { borderColor: score === 0 ? Colors.slate300 : stroke }]}>
        <Text style={[styles.score, { color: score === 0 ? Colors.slate400 : text }]}>
          {score === 0 ? '—' : score}
        </Text>
        {score > 0 && <Text style={[styles.outOf, { color: text }]}>/ 100</Text>}
      </View>
      <Text style={styles.label}>RUFUS Credit Score</Text>
      <Text style={[styles.level, { color: score === 0 ? Colors.slate400 : text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', padding: 16 },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  score: { fontSize: 32, fontWeight: '800' },
  outOf: { fontSize: 10, fontWeight: '600' },
  label: { marginTop: 10, fontSize: 13, fontWeight: '600', color: Colors.slate700 },
  level: { fontSize: 12, fontWeight: '700', marginTop: 4 },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, cardStyle } from '../../theme';

export default function DocumentsScreen() {
  const documents = [
    {
      id: 1,
      name: 'Business Plan',
      icon: 'document-text',
      format: 'PDF or Image',
      status: 'approved',
    },
    {
      id: 2,
      name: 'Financial Statement',
      icon: 'bar-chart',
      format: 'PDF or Spreadsheet',
      status: 'reviewing',
    },
    {
      id: 3,
      name: 'Business Permit',
      icon: 'ribbon',
      format: 'Image',
      status: 'approved',
    },
    {
      id: 4,
      name: 'Valid ID',
      icon: 'card',
      format: 'Government-issued ID',
      status: 'required',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':
        return { bg: colors.successBg, border: colors.success, badge: 'APPROVED' };
      case 'reviewing':
        return { bg: colors.warningBg, border: colors.warning, badge: 'UNDER REVIEW' };
      case 'required':
        return { bg: colors.dangerBg, border: colors.danger, badge: 'REQUIRED' };
      case 'submitted':
        return { bg: colors.infoBg, border: colors.teal, badge: 'SUBMITTED' };
      default:
        return { bg: colors.white, border: colors.border, badge: '' };
    }
  };

  const handleUpload = (docName) => {
    Alert.alert('Upload', `Upload ${docName} functionality will be implemented`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Submit Documents</Text>
        </View>

        {/* Progress Indicator Card */}
        <View style={[styles.progressCard, { marginHorizontal: 20, marginTop: 12 }]}>
          <Text style={styles.progressTitle}>3 of 4 Submitted</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '75%' }]} />
          </View>
          <Text style={styles.progressLabel}>75% Complete</Text>
        </View>

        {/* Documents List */}
        <View style={styles.documentsList}>
          {documents.map((doc) => {
            const statusStyle = getStatusStyle(doc.status);
            return (
              <View
                key={doc.id}
                style={[
                  styles.documentCard,
                  {
                    borderLeftColor: statusStyle.border,
                    backgroundColor: statusStyle.bg,
                  },
                ]}
              >
                {/* Icon Column */}
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: statusStyle.border },
                  ]}
                >
                  <Ionicons name={doc.icon} size={24} color={colors.white} />
                </View>

                {/* Content Column */}
                <View style={styles.documentContent}>
                  <View style={styles.documentHeader}>
                    <Text style={styles.documentTitle}>{doc.name}</Text>
                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: statusStyle.border },
                      ]}
                    >
                      <Text style={styles.badgeText}>{statusStyle.badge}</Text>
                    </View>
                  </View>

                  <Text style={styles.documentFormat}>
                    {doc.format} • Accepted: PDF, JPG, PNG{doc.id === 2 ? ', XLSX' : ''}
                  </Text>

                  {/* Action Buttons */}
                  <View style={styles.buttonGroup}>
                    {doc.status !== 'required' ? (
                      <>
                        <TouchableOpacity style={styles.buttonSecondary}>
                          <Ionicons name="eye" size={14} color={colors.teal} />
                          <Text style={styles.buttonSecondaryText}>View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonSecondary}>
                          <Ionicons name="refresh" size={14} color={colors.teal} />
                          <Text style={styles.buttonSecondaryText}>Replace</Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.buttonPrimary}
                        onPress={() => handleUpload(doc.name)}
                      >
                        <Ionicons name="cloud-upload" size={14} color={colors.white} />
                        <Text style={styles.buttonPrimaryText}>Upload Now</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  screenTitle: {
    ...typography.screenTitle,
  },
  progressCard: {
    ...cardStyle,
    paddingVertical: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 12,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.teal,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
  documentsList: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  documentCard: {
    flexDirection: 'row',
    borderLeftWidth: 4,
    borderRadius: 12,
    padding: 12,
    backgroundColor: colors.white,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 120,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentContent: {
    flex: 1,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 8,
  },
  documentTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  documentFormat: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: colors.teal,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    minHeight: 36,
  },
  buttonPrimaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.teal,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    minHeight: 36,
  },
  buttonSecondaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.teal,
  },
});

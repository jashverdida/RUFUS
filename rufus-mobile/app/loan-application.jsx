import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';

const Colors = {
  primary: '#1A4FA3',
  accent: '#17C5CB',
  background: '#F4F8FF',
  cardBg: '#FFFFFF',
  textPrimary: '#0D1B3E',
  textSecondary: '#4A6FA5',
  textMuted: '#8FA8CC',
  border: '#D6E4F7',
  success: '#1A9E6A',
  successBg: '#E8F7F1',
  warning: '#E07B00',
  warningBg: '#FEF3E2',
};

export default function LoanApplicationScreen() {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false]);
  const [uploadedDocs, setUploadedDocs] = useState({
    businessPlan: null,
    businessHistory: null,
    financialStatement: null,
  });

  const confirmedCount = checkedItems.filter((item) => item).length;
  const allChecked = checkedItems.every((item) => item === true);

  const requirementsList = [
    'I am between 18 and 64 years old.',
    'I have lived at my current address for at least one year.',
    'I have a stable family income and can commit to a loan amount based on my capacity to pay.',
    'I have no active legal cases and maintain a good credit standing.',
    'I am willing to attend regular center meetings.',
  ];

  const documentsList = [
    {
      key: 'businessPlan',
      name: 'Business Plan',
      subtitle: 'Describe your business and loan purpose',
      iconBg: Colors.accent,
      icon: 'briefcase',
    },
    {
      key: 'businessHistory',
      name: 'Business History',
      subtitle: 'How long you have been operating',
      iconBg: Colors.primary,
      icon: 'calendar',
    },
    {
      key: 'financialStatement',
      name: 'Financial Statement',
      subtitle: 'Income and expenses for the last 3 months',
      iconBg: Colors.success,
      icon: 'bar-chart',
    },
  ];

  const toggleCheckbox = (index) => {
    const newItems = [...checkedItems];
    newItems[index] = !newItems[index];
    setCheckedItems(newItems);
  };

  const handleDocumentUpload = async (key) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*', 'application/msword'],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setUploadedDocs((prev) => ({
          ...prev,
          [key]: {
            uri: file.uri,
            name: file.name,
            size: file.size,
          },
        }));
      }
    } catch (error) {
      console.error('Document pick error:', error);
    }
  };

  const handleContinue = () => {
    // PROTOTYPE: No blocking - just navigate
    router.push('/identity-verification');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Loan Application</Text>
          <Text style={styles.headerSubtitle}>Step 1 of 2 — Eligibility Check</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarTrack}>
        <View style={[styles.progressBarFill, { width: '50%' }]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Requirements Banner */}
        <View
          style={[
            styles.banner,
            {
              backgroundColor: allChecked ? Colors.successBg : Colors.warningBg,
            },
          ]}
        >
          <Text
            style={[
              styles.bannerText,
              {
                color: allChecked ? Colors.success : Colors.warning,
              },
            ]}
          >
            {allChecked
              ? `✓ All requirements confirmed`
              : `${confirmedCount} of 5 requirements confirmed`}
          </Text>
        </View>

        {/* Section 1: General Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Requirements</Text>
          <Text style={styles.sectionSubtitle}>
            Please confirm all items apply to you before proceeding.
          </Text>

          <View style={styles.card}>
            {requirementsList.map((requirement, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => toggleCheckbox(index)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkbox,
                      checkedItems[index] && styles.checkboxChecked,
                    ]}
                  >
                    {checkedItems[index] && (
                      <Ionicons
                        name="checkmark"
                        size={14}
                        color={Colors.cardBg}
                      />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>{requirement}</Text>
                  {index === 4 && (
                    <View style={styles.requiredBadge}>
                      <Text style={styles.requiredBadgeText}>Required</Text>
                    </View>
                  )}
                </TouchableOpacity>
                {index < requirementsList.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Section 2: Required Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Documents</Text>
          <Text style={styles.sectionSubtitle}>
            Upload or take a photo of each document. RUFUS AI will extract the data automatically.
          </Text>

          {documentsList.map((doc, index) => (
            <View key={doc.key} style={styles.documentCard}>
              {/* Icon Circle */}
              <View
                style={[
                  styles.documentIconCircle,
                  { backgroundColor: doc.iconBg },
                ]}
              >
                <Ionicons name={doc.icon} size={24} color={Colors.cardBg} />
              </View>

              {/* Text Content */}
              <View style={styles.documentContent}>
                <Text style={styles.documentName}>{doc.name}</Text>
                <Text style={styles.documentSubtitle}>{doc.subtitle}</Text>
              </View>

              {/* Upload Button */}
              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  uploadedDocs[doc.key] && styles.uploadButtonSuccess,
                ]}
                onPress={() => handleDocumentUpload(doc.key)}
                activeOpacity={0.7}
              >
                {uploadedDocs[doc.key] ? (
                  <>
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={Colors.success}
                    />
                    <Text style={[styles.uploadButtonText, { color: Colors.success }]}>
                      Uploaded
                    </Text>
                  </>
                ) : (
                  <>
                    <Ionicons
                      name="cloud-upload-outline"
                      size={16}
                      color={Colors.accent}
                    />
                    <Text style={styles.uploadButtonText}>Upload</Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Filename Display */}
              {uploadedDocs[doc.key] && (
                <Text style={styles.filenameText} numberOfLines={1}>
                  {uploadedDocs[doc.key].name.substring(0, 20)}
                </Text>
              )}
            </View>
          ))}

          <Text style={styles.uploadNote}>
            📷 You may take a photo of physical documents. RUFUS will read them automatically.
          </Text>
        </View>

        {/* Spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Continue Button - Sticky Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !allChecked && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>Continue to Submit →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  headerSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  progressBarTrack: {
    height: 4,
    backgroundColor: '#EAF1FB',
    overflow: 'hidden',
  },

  progressBarFill: {
    height: 4,
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },

  banner: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  bannerText: {
    fontSize: 14,
    fontWeight: '600',
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },

  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxChecked: {
    backgroundColor: Colors.accent,
  },

  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },

  requiredBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  requiredBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.cardBg,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },

  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 12,
    gap: 12,
  },

  documentIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  documentContent: {
    flex: 1,
  },

  documentName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  documentSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.accent,
    backgroundColor: Colors.cardBg,
    gap: 4,
  },

  uploadButtonSuccess: {
    backgroundColor: Colors.successBg,
    borderColor: Colors.success,
  },

  uploadButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.accent,
  },

  filenameText: {
    fontSize: 11,
    color: Colors.textMuted,
    position: 'absolute',
    bottom: 4,
    right: 12,
  },

  uploadNote: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 12,
  },

  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  continueButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  continueButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },

  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.cardBg,
  },
});

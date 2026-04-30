import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
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
  infoLight: '#EAF1FB',
};

export default function IdentityVerificationScreen() {
  const router = useRouter();
  const [govId, setGovId] = useState(null);
  const [selfie, setSelfie] = useState(null);

  const handlePickGovId = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setGovId({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || 'application/octet-stream',
        });
      }
    } catch (error) {
      console.error('Document picker error:', error);
    }
  };

  const handleTakeGovIdPhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setGovId({
          uri: image.uri,
          name: image.fileName || 'government-id-photo.jpg',
          type: 'image/jpeg',
        });
      }
    } catch (error) {
      console.error('Camera error:', error);
    }
  };

  const handleTakeSelfie = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setSelfie({
          uri: image.uri,
          name: image.fileName || 'selfie.jpg',
          type: 'image/jpeg',
        });
      }
    } catch (error) {
      console.error('Camera error:', error);
    }
  };

  const handlePickSelfie = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setSelfie({
          uri: image.uri,
          name: image.fileName || 'selfie-selected.jpg',
          type: 'image/jpeg',
        });
      }
    } catch (error) {
      console.error('Image library error:', error);
    }
  };

  const handleSubmit = () => {
    // PROTOTYPE: No blocking - navigate to success screen
    router.push('/application-success');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Verify Your Identity</Text>
          <Text style={styles.headerSubtitle}>Step 2 of 2 — Identity Verification</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarTrack}>
        <View style={[styles.progressBarFill, { width: '100%' }]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Text */}
        <Text style={styles.introText}>
          To complete your application, we need to verify your identity.
        </Text>

        {/* Government ID Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card" size={20} color={Colors.accent} />
            <Text style={styles.sectionTitle}>Government-Issued ID</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Upload a clear photo or scan
          </Text>

          {/* ID Upload Area */}
          <View style={styles.uploadArea}>
            {govId ? (
              <>
                {govId.type === 'image/jpeg' || govId.type === 'image/png' ? (
                  <Image
                    source={{ uri: govId.uri }}
                    style={styles.uploadPreview}
                  />
                ) : (
                  <View style={styles.documentPreview}>
                    <Ionicons name="document" size={48} color={Colors.textMuted} />
                    <Text style={styles.documentName} numberOfLines={1}>
                      {govId.name.substring(0, 20)}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.emptyUploadBox}>
                <Ionicons name="card" size={48} color={Colors.textMuted} />
                <Text style={styles.emptyUploadText}>Tap to upload your ID</Text>
              </View>
            )}
          </View>

          {/* Upload/Camera Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.uploadActionButton, styles.outlineButton]}
              onPress={handlePickGovId}
              activeOpacity={0.7}
            >
              <Ionicons name="document-attach" size={18} color={Colors.accent} />
              <Text style={styles.buttonText}>Upload from Files</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.uploadActionButton, styles.filledButton]}
              onPress={handleTakeGovIdPhoto}
              activeOpacity={0.7}
            >
              <Ionicons name="camera" size={18} color={Colors.cardBg} />
              <Text style={[styles.buttonText, { color: Colors.cardBg }]}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Selfie Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person" size={20} color={Colors.accent} />
            <Text style={styles.sectionTitle}>Take a Selfie</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Hold your phone at arm's length
          </Text>

          {/* Selfie Upload Area */}
          <View style={styles.uploadArea}>
            {selfie ? (
              <Image
                source={{ uri: selfie.uri }}
                style={[styles.uploadPreview, styles.selfiePreview]}
              />
            ) : (
              <View style={styles.emptyUploadBox}>
                <Ionicons name="person-circle" size={48} color={Colors.textMuted} />
                <Text style={styles.emptyUploadText}>Tap to take a selfie</Text>
              </View>
            )}
          </View>

          {/* Selfie Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.uploadActionButton, styles.filledButton]}
              onPress={handleTakeSelfie}
              activeOpacity={0.7}
            >
              <Ionicons name="camera" size={18} color={Colors.cardBg} />
              <Text style={[styles.buttonText, { color: Colors.cardBg }]}>Take Selfie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.uploadActionButton, styles.outlineButton]}
              onPress={handlePickSelfie}
              activeOpacity={0.7}
            >
              <Ionicons name="image" size={18} color={Colors.accent} />
              <Text style={styles.buttonText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips Box */}
        <View style={styles.tipsBox}>
          <Ionicons name="information-circle" size={18} color={Colors.textSecondary} />
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>Tips for best results</Text>
            <Text style={styles.tipItem}>• Use good lighting</Text>
            <Text style={styles.tipItem}>• Ensure your face is clearly visible</Text>
            <Text style={styles.tipItem}>• ID should be flat and fully visible</Text>
          </View>
        </View>

        {/* Spacer */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Submit Button - Sticky Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.submitButtonText}>Submit Application →</Text>
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

  introText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },

  section: {
    marginBottom: 28,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
  },

  uploadArea: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  emptyUploadBox: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  emptyUploadText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },

  uploadPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  selfiePreview: {
    borderRadius: 16,
    width: 120,
    height: 120,
  },

  documentPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  documentName: {
    fontSize: 12,
    color: Colors.textMuted,
    maxWidth: 150,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },

  uploadActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },

  outlineButton: {
    borderWidth: 1.5,
    borderColor: Colors.accent,
    backgroundColor: Colors.cardBg,
  },

  filledButton: {
    backgroundColor: Colors.accent,
  },

  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.accent,
  },

  tipsBox: {
    flexDirection: 'row',
    backgroundColor: Colors.infoLight,
    borderRadius: 12,
    padding: 12,
    gap: 10,
    marginTop: 8,
  },

  tipsContent: {
    flex: 1,
  },

  tipsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
  },

  tipItem: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.cardBg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },

  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.cardBg,
  },
});

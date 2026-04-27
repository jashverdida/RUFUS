import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#f8fafc',
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
  },
  stepCircleActive: {
    backgroundColor: '#2563eb',
  },
  stepText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748b',
  },
  stepTextActive: {
    color: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    height: 56,
    fontSize: 16,
    color: '#1e293b',
    backgroundColor: '#f1f5f9',
  },
  uploadArea: {
    marginTop: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#94a3b8',
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    paddingVertical: 48,
    paddingHorizontal: 24,
    minHeight: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  fileCard: {
    marginTop: 20,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  fileSize: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  deleteText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#dc2626',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  backButtonDisabled: {
    opacity: 0.5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  backButtonTextDisabled: {
    color: '#94a3b8',
  },
  nextButton: {
    flex: 1,
    height: 60,
    backgroundColor: '#2563eb',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default function UploadWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [yearsInOperation, setYearsInOperation] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({
    businessPlan: null,
    financials: null,
  });

  const handleSimulateUpload = (fileType) => {
    const mockFile = {
      name: fileType === 'businessPlan' ? 'Business_Plan.pdf' : 'Financial_Statements.pdf',
      size: Math.floor(Math.random() * 5000) + 500,
    };
    setUploadedFiles((prev) => ({
      ...prev,
      [fileType]: mockFile,
    }));
  };

  const handleDeleteFile = (fileType) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [fileType]: null,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      alert('Application submitted!');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepCircle}>
          <View
            style={[
              styles.stepCircle,
              step <= currentStep && styles.stepCircleActive,
            ]}
          >
            <Text
              style={[
                styles.stepText,
                step <= currentStep && styles.stepTextActive,
              ]}
            >
              {step}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <ScrollView style={styles.contentContainer}>
      <Text style={styles.stepTitle}>Business Information</Text>

      <Text style={styles.label}>Business Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your business name"
        placeholderTextColor="#cbd5e1"
        value={businessName}
        onChangeText={setBusinessName}
      />

      <Text style={styles.label}>Years in Operation</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g., 5"
        placeholderTextColor="#cbd5e1"
        value={yearsInOperation}
        onChangeText={setYearsInOperation}
        keyboardType="numeric"
      />
    </ScrollView>
  );

  const renderUploadStep = (stepType) => {
    const fileKey = stepType === 2 ? 'businessPlan' : 'financials';
    const uploadedFile = uploadedFiles[fileKey];
    const stepTitle =
      stepType === 2 ? 'Business Plan' : 'Financial Statements';

    return (
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.stepTitle}>{stepTitle}</Text>

        {!uploadedFile ? (
          <TouchableOpacity
            style={styles.uploadArea}
            onPress={() => handleSimulateUpload(fileKey)}
          >
            <Text style={{ fontSize: 40 }}>📤</Text>
            <Text style={styles.uploadText}>Tap to Upload Document</Text>
            <Text style={styles.uploadSubtext}>PDF, up to 5 MB</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.fileCard}>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>📄 {uploadedFile.name}</Text>
              <Text style={styles.fileSize}>
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteFile(fileKey)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderUploadStep(2);
      case 3:
        return renderUploadStep(3);
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.container}>
          {renderStepIndicator()}
          {renderContent()}

          <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.backButton,
            currentStep === 1 && styles.backButtonDisabled,
          ]}
          onPress={handleBack}
          disabled={currentStep === 1}
        >
          <Text
            style={[
              styles.backButtonText,
              currentStep === 1 && styles.backButtonTextDisabled,
            ]}
          >
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentStep === 3 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

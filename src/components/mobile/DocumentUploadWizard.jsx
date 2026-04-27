import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function DocumentUploadWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessDetails, setBusinessDetails] = useState({
    businessName: '',
    ownerName: '',
    businessType: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    businessPlan: null,
    financialStatements: null,
  });

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      Alert.alert('Success', 'Application submitted successfully!');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSimulateUpload = (fileType) => {
    const mockFile = {
      name: `${fileType === 'businessPlan' ? 'Business_Plan' : 'Financial_Statements'}_${Date.now()}.pdf`,
      size: Math.floor(Math.random() * 5000) + 500,
      type: 'application/pdf',
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

  const renderStepIndicator = () => (
    <View className="flex-row justify-between items-center px-6 py-8">
      {[1, 2, 3].map((step) => (
        <View key={step} className="flex-1 flex-row items-center">
          <View
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              step <= currentStep ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          >
            <Text
              className={`text-lg font-bold ${
                step <= currentStep ? 'text-white' : 'text-slate-600'
              }`}
            >
              {step}
            </Text>
          </View>
          {step < 3 && (
            <View
              className={`flex-1 h-1 mx-2 ${
                step < currentStep ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <ScrollView className="flex-1 bg-white px-6 py-8">
      <Text className="text-2xl font-bold text-slate-800 mb-8">
        Business Details
      </Text>

      <View className="mb-8">
        <Text className="text-sm font-semibold text-slate-800 mb-3">
          Business Name
        </Text>
        <TextInput
          placeholder="Enter business name"
          value={businessDetails.businessName}
          onChangeText={(text) =>
            setBusinessDetails({ ...businessDetails, businessName: text })
          }
          className="w-full border border-slate-200 rounded-lg px-4 py-4 text-base text-slate-800"
          placeholderTextColor="#cbd5e1"
        />
      </View>

      <View className="mb-8">
        <Text className="text-sm font-semibold text-slate-800 mb-3">
          Owner Name
        </Text>
        <TextInput
          placeholder="Enter owner name"
          value={businessDetails.ownerName}
          onChangeText={(text) =>
            setBusinessDetails({ ...businessDetails, ownerName: text })
          }
          className="w-full border border-slate-200 rounded-lg px-4 py-4 text-base text-slate-800"
          placeholderTextColor="#cbd5e1"
        />
      </View>

      <View className="mb-12">
        <Text className="text-sm font-semibold text-slate-800 mb-3">
          Business Type
        </Text>
        <TextInput
          placeholder="e.g., Retail, Services, Agriculture"
          value={businessDetails.businessType}
          onChangeText={(text) =>
            setBusinessDetails({ ...businessDetails, businessType: text })
          }
          className="w-full border border-slate-200 rounded-lg px-4 py-4 text-base text-slate-800"
          placeholderTextColor="#cbd5e1"
        />
      </View>
    </ScrollView>
  );

  const renderUploadBox = (fileType, label) => {
    const file = uploadedFiles[fileType];

    return (
      <View className="mb-8">
        {!file ? (
          <TouchableOpacity
            onPress={() => handleSimulateUpload(fileType)}
            className="border-2 border-dashed border-blue-300 rounded-lg px-6 py-12 flex items-center justify-center bg-blue-50"
          >
            <Feather name="upload-cloud" size={48} color="#2563eb" />
            <Text className="text-base font-semibold text-blue-600 mt-4">
              Tap to Upload
            </Text>
            <Text className="text-sm text-slate-600 mt-2">
              {label}
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-4 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Feather name="file-text" size={32} color="#2563eb" />
              <View className="ml-4 flex-1">
                <Text className="text-sm font-semibold text-slate-800">
                  {file.name}
                </Text>
                <Text className="text-xs text-slate-600 mt-1">
                  {(file.size / 1024).toFixed(2)} KB
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteFile(fileType)}
              className="p-3"
            >
              <Feather name="trash-2" size={20} color="#dc2626" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderStep2 = () => (
    <ScrollView className="flex-1 bg-white px-6 py-8">
      <Text className="text-2xl font-bold text-slate-800 mb-4">
        Business Plan
      </Text>
      <Text className="text-slate-600 mb-8">
        Upload your business plan document
      </Text>
      {renderUploadBox('businessPlan', 'Business Plan (PDF)')}
    </ScrollView>
  );

  const renderStep3 = () => (
    <ScrollView className="flex-1 bg-white px-6 py-8">
      <Text className="text-2xl font-bold text-slate-800 mb-4">
        Financial Statements
      </Text>
      <Text className="text-slate-600 mb-8">
        Upload your financial statements
      </Text>
      {renderUploadBox('financialStatements', 'Financial Statements (PDF)')}
    </ScrollView>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white">
      {renderStepIndicator()}
      {renderContent()}

      <View className="px-6 py-6 flex-row justify-between gap-4 bg-white border-t border-slate-200">
        <TouchableOpacity
          onPress={handlePreviousStep}
          disabled={currentStep === 1}
          className={`flex-1 py-4 rounded-lg border-2 ${
            currentStep === 1
              ? 'border-slate-200 bg-slate-50'
              : 'border-blue-600 bg-white'
          }`}
        >
          <Text
            className={`text-center font-semibold text-base ${
              currentStep === 1 ? 'text-slate-400' : 'text-blue-600'
            }`}
          >
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNextStep}
          className="flex-1 py-4 rounded-lg bg-blue-600"
        >
          <Text className="text-center font-semibold text-base text-white">
            {currentStep === 3 ? 'Submit' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

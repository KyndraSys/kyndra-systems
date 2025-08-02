
import React, { useState } from 'react';
import { X, Upload, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { webServices, graphicsServices } from '../../data/services';
import { useCallback, useMemo } from 'react';

const OnboardingForm = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Project Overview
    companyName: '',
    industry: '',
    selectedServices: [],
    timeline: '',
    objectives: '',

    // Step 2: Technical Requirements
    platforms: [],
    integrations: '',
    scalability: '',
    security: '',

    // Step 3: Design Preferences
    brandGuidelines: '',
    designStyle: '',
    contentManagement: '',
    userExperience: '',

    // Step 4: Project Details
    projectDescription: '',
    successMetrics: '',
    stakeholders: '',
    specialRequirements: '',

    // Step 5: File Uploads
    files: [],

    // Step 6: Contact Information
    contactName: '',
    email: '',
    phone: '',
    communicationMethod: '',
    urgency: '',
    comments: ''
  });

  const totalSteps = 6;
  const allServices = [...webServices, ...graphicsServices];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleFileUpload = (files) => {
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...Array.from(files)]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

const validateForm = useCallback(() => {
  const errors = [];
  
  // Required field checks

  
  if (!formData.companyName?.trim()) {
    errors.push('Company/Project name is required');
  }
  
  if (!formData.email?.trim()) {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!formData.phone?.trim()) {
    errors.push('Phone number is required');
  }
  
  if (!formData.projectDescription?.trim()) {
    errors.push('Project description is required');
  }
  
  if (!formData.selectedServices || formData.selectedServices.length === 0) {
    errors.push('Please select at least one service');
  }
  

  
  if (!formData.timeline?.trim()) {
    errors.push('Timeline is required');
  }
  
  return errors;
}, [formData]);

const handleSubmit = async () => {
  // Validate form before submission
  const validationErrors = validateForm();
  
  if (validationErrors.length > 0) {
    alert('Please fill in all required fields:\n\n' + validationErrors.join('\n'));
    return;
  }
  
  // Create service lookup map
  const serviceMap = {};
  allServices.forEach(service => {
    serviceMap[service.id] = service.name;
  });

  const submissionData = {
    ...formData,
    submittedAt: new Date().toISOString(),
    selectedServiceNames: formData.selectedServices
      .map(id => serviceMap[id])
      .filter(Boolean)
  };

  try {
    // First, save to backend
    const response = await fetch('http://localhost:3001/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Submission successful:', result);
    
    // Then, send email confirmation
    await sendEmailConfirmation(submissionData);
    
    alert('Thank you! Your project details have been submitted and a confirmation email has been sent. We will contact you within 24 hours.');
    onClose();
  } catch (error) {
    console.error('Submission failed:', error);
    const errorMessage = error.name === 'TypeError' 
      ? 'Network error. Please check your connection and try again.'
      : 'Sorry, there was an error submitting your form. Please try again.';
    alert(errorMessage);
  }
};

// Email sending function
const sendEmailConfirmation = async (submissionData) => {
  // Prepare email data for the template
  const emailData = {
    to_email: submissionData.email,
    to_name: submissionData.contactName || submissionData.companyName,
    project_title: submissionData.projectName,
    company_name: submissionData.companyName,
    selected_services: submissionData.selectedServiceNames.join(', '),
    project_description: submissionData.projectDescription,

    timeline: submissionData.timeline,
    phone: submissionData.phone,
    submitted_date: new Date(submissionData.submittedAt).toLocaleDateString(),
    reply_to: submissionData.email
  };

  try {
    console.log('Sending email with data:', emailData);
    
    const emailResponse = await emailjs.send(
      "kyndra", // Your service ID
      "template_gfr9gus", // Your template ID  
      emailData,
      "oTpL_XYmDSHLjSO3b" // Your public key
    );
    
    console.log('Email sent successfully:', emailResponse);
  } catch (error) {
    console.error('Email sending failed:', error);

  }
};

  if (!isOpen) return null;

  return (
  
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#000000] text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Project Onboarding</h2>
            <p className="text-kyndra-100">Step {currentStep} of {totalSteps}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-kyndra-700 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 h-2">
          <div
            className="bg-[#ff6200] h-2 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Step 1: Project Overview */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Project *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                    required
                  >
                    <option value="">Select Industry</option>
                    <option value="technology">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Services Needed * (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {allServices.map((service) => (
                    <label key={service.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.selectedServices.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                        className="w-4 h-4 text-kyndra-600 border-gray-300 rounded focus:ring-kyndra-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{service.name}</div>
                        <div className="text-xs text-gray-500">{service.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Timeline *
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                    required
                  >
                    <option value="">Select Timeline</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="standard">Standard (1-2 months)</option>
                    <option value="flexible">Flexible (3+ months)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Objectives *
                </label>
                <textarea
                  value={formData.objectives}
                  onChange={(e) => handleInputChange('objectives', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  placeholder="Describe your main goals for this project..."
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Technical Requirements */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Requirements</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Platform Preferences (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Web Application', 'Mobile Responsive', 'Progressive Web App', 'Desktop Compatible', 'Tablet Optimized', 'Cross-Platform'].map((platform) => (
                    <label key={platform} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.platforms.includes(platform)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleInputChange('platforms', [...formData.platforms, platform]);
                          } else {
                            handleInputChange('platforms', formData.platforms.filter(p => p !== platform));
                          }
                        }}
                        className="w-4 h-4 text-kyndra-600 border-gray-300 rounded focus:ring-kyndra-500"
                      />
                      <span className="text-sm text-gray-700">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Integration Needs
                </label>
                <textarea
                  value={formData.integrations}
                  onChange={(e) => handleInputChange('integrations', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  placeholder="Describe any third-party integrations needed (APIs, payment systems, etc.)..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scalability Requirements
                  </label>
                  <select
                    value={formData.scalability}
                    onChange={(e) => handleInputChange('scalability', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  >
                    <option value="">Select Scalability</option>
                    <option value="small">Small Scale (Under 1,000 users)</option>
                    <option value="medium">Medium Scale (1,000 - 10,000 users)</option>
<option value="large">Large Scale (Over 10,000 users)</option>
<option value="enterprise">Enterprise Scale (Over 100,000 users)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Security Level
                  </label>
                  <select
                    value={formData.security}
                    onChange={(e) => handleInputChange('security', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  >
                    <option value="">Select Security Level</option>
                    <option value="standard">Standard Security</option>
                    <option value="enhanced">Enhanced Security</option>
                    <option value="enterprise">Enterprise Security</option>
                    <option value="compliance">Compliance Required (GDPR, HIPAA, etc.)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Design Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Design Preferences</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Guidelines Availability
                </label>
                <select
                  value={formData.brandGuidelines}
                  onChange={(e) => handleInputChange('brandGuidelines', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                >
                  <option value="">Select Option</option>
                  <option value="complete">Complete brand guidelines available</option>
                  <option value="partial">Partial brand elements available</option>
                  <option value="none">No existing brand guidelines</option>
                  <option value="new">Need new brand identity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Design Style Preference
                </label>
                <select
                  value={formData.designStyle}
                  onChange={(e) => handleInputChange('designStyle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                >
                  <option value="">Select Style</option>
                  <option value="modern">Modern & Minimalist</option>
                  <option value="corporate">Corporate & Professional</option>
                  <option value="creative">Creative & Bold</option>
                  <option value="traditional">Traditional & Conservative</option>
                  <option value="tech">Tech & Futuristic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Management Needs
                </label>
                <textarea
                  value={formData.contentManagement}
                  onChange={(e) => handleInputChange('contentManagement', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  placeholder="Describe who will manage content and how often it will be updated..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Experience Priorities
                </label>
                <textarea
                  value={formData.userExperience}
                  onChange={(e) => handleInputChange('userExperience', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  placeholder="What are your main UX goals? (e.g., ease of use, conversion optimization, accessibility)..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Project Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Project Description *
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  placeholder="Provide a comprehensive description of your project requirements..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Success Metrics
                </label>
                <textarea
                  value={formData.successMetrics}
                  onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  placeholder="How will you measure the success of this project?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Stakeholders
                </label>
                <textarea
                  value={formData.stakeholders}
                  onChange={(e) => handleInputChange('stakeholders', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  placeholder="Who are the key stakeholders and decision makers for this project?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <textarea
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  placeholder="Any special requirements, constraints, or considerations?"
                />
              </div>
            </div>
          )}

          


{/* Step 5: File Uploads (Continued) */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">File Uploads</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Upload Supporting Documents
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  Upload company profiles, brand materials, reference documents, or technical specifications. 
                  Supported formats: PDF, DOC, DOCX, JPG, PNG, SVG
                </p>
                
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-kyndra-400 transition-colors"
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileUpload(e.dataTransfer.files);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">Drop files here or click to upload</p>
                  <p className="text-sm text-gray-500 mb-4">Maximum file size: 10MB per file</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.svg"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-kyndra-600 text-white px-6 py-2 rounded-lg hover:bg-kyndra-700 transition-colors cursor-pointer inline-block"
                  >
                    Choose Files
                  </label>
                </div>

                {/* Uploaded Files List */}
                {formData.files.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Files:</h4>
                    <div className="space-y-2">
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-kyndra-100 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-medium text-kyndra-600">
                                {file.name.split('.').pop().toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Contact Information */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact & Next Steps</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Contact Name *
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Communication Method
                  </label>
                  <select
                    value={formData.communicationMethod}
                    onChange={(e) => handleInputChange('communicationMethod', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  >
                    <option value="">Select Method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="video">Video Call</option>
                    <option value="meeting">In-Person Meeting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Urgency Level
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                >
                  <option value="">Select Urgency</option>
                  <option value="low">Low - Can wait 1-2 weeks for response</option>
                  <option value="medium">Medium - Need response within 1 week</option>
                  <option value="high">High - Need response within 2-3 days</option>
                  <option value="urgent">Urgent - Need response within 24 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  value={formData.comments}
                  onChange={(e) => handleInputChange('comments', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kyndra-500 focus:border-kyndra-500"
                  placeholder="Any additional information or questions you'd like to share..."
                />
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Summary</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Company:</span> {formData.companyName}</p>
                  <p><span className="font-medium">Services:</span> {formData.selectedServices.length} selected</p>
                  <p><span className="font-medium">Timeline:</span> {formData.timeline}</p>
                  <p><span className="font-medium">Files:</span> {formData.files.length} uploaded</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="bg-[#000000] px-6 py-4 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#a0a0a0] text-white hover:bg-[#ff6200]'
            }`}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i + 1 === currentStep ? 'bg-kyndra-600' : i + 1 < currentStep ? 'bg-[#ff6200]' : 'bg-[#a0a0a0]'
                }`}
              />
            ))}
          </div>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="flex items-center px-4 py-2 bg-[#a0a0a0] text-white rounded-lg font-medium hover:bg-[#ff6200] transition-colors"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 bg-[#ff6200] text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <Check className="h-4 w-4 mr-2" />
              Submit Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
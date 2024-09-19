"use client";
import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { saveAs } from "file-saver";

// Dynamically load ReactQuill for rich text fields
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Define the type for formData
type FormDataType = {
  id: string;
  candidateName: string;
  partyName: string;
  age: string;
  educationLevel: string;
  image: File | null;
  cv: File | null;
  educationCertificate: File | null;
  programDetails: string;
  vision: string;
  goals: string;
  priorities: string;
  kpis: string;
  collaboration: string;
  trackingMechanism: string;
  proposedPrograms: string;
};

// Define the type for fetched Program
type Program = {
  id: string;
  candidateName: string;
  partyName: string;
  age: number;
  educationLevel: string;
  image?: string | null;
  cv?: string | null;
  educationCertificate?: string | null;
  programDetails: string;
  vision: string;
  goals: string;
  priorities: string;
  kpis: string;
  collaboration: string;
  trackingMechanism: string;
  proposedPrograms: string;
  createdAt: string;
  updatedAt: string;
};

// Main Component
export default function EditProgram() {
  const router = useRouter();
  const steps = ["بيانات المرشح", "المرفقات", "تفاصيل البرنامج", "المؤشرات والتعاون"];

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormDataType>({
    id: "",
    candidateName: "",
    partyName: "",
    age: "",
    educationLevel: "",
    image: null,
    cv: null,
    educationCertificate: null,
    programDetails: "",
    vision: "",
    goals: "",
    priorities: "",
    kpis: "",
    collaboration: "",
    trackingMechanism: "",
    proposedPrograms: "",
  });

  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [existingCV, setExistingCV] = useState<string | null>(null);
  const [existingEducationCertificate, setExistingEducationCertificate] = useState<string | null>(null);

  useEffect(() => {
    const fetchFirstProgram = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/programs/get-program', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: Program = await response.json();
          setFormData({
            id: data.id,
            candidateName: data.candidateName,
            partyName: data.partyName,
            age: data.age.toString(),
            educationLevel: data.educationLevel,
            image: null,
            cv: null,
            educationCertificate: null,
            programDetails: data.programDetails,
            vision: data.vision,
            goals: data.goals,
            priorities: data.priorities,
            kpis: data.kpis,
            collaboration: data.collaboration,
            trackingMechanism: data.trackingMechanism,
            proposedPrograms: data.proposedPrograms,
          });
          // Remove 'public/' from the path and replace backslashes with forward slashes
          setExistingImage(data.image ? data.image.replace(/\\/g, '/').replace(/^\/?public\//, '/') : null);
          setExistingCV(data.cv ? data.cv.replace(/\\/g, '/').replace(/^\/?public\//, '/') : null);
          setExistingEducationCertificate(data.educationCertificate ? data.educationCertificate.replace(/\\/g, '/').replace(/^\/?public\//, '/') : null);
        } else if (response.status === 404) {
          toast.error('No program found to edit.');
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Failed to fetch the program.');
        }
      } catch (error) {
        console.error('Error fetching program:', error);
        toast.error('An error occurred while fetching the program.');
      } finally {
        setLoading(false);
      }
    };

    fetchFirstProgram();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleEditorChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example: Inside handleSubmit before sending the request
    if (!formData.candidateName.trim()) {
      toast.error("اسم المرشح مطلوب");
      return;
    }
    // Add similar checks for other required fields

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (key === 'image' || key === 'cv' || key === 'educationCertificate') {
          if (value instanceof File) {
            data.append(key, value);
          }
        } else {
          data.append(key, value.toString());
        }
      }
    });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/programs/edit-program', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        toast.success('تم تحديث البرنامج بنجاح');
        router.push('/');
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'فشل تحديث البرنامج';
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث البرنامج');
    }
  };

  // Function to construct the full URL
  const getFullUrl = (filePath: string) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${filePath}`;
    }
    return filePath; // Fallback for server-side
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label='اسم المرشح'
              name='candidateName'
              value={formData.candidateName}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label='اسم الحزب'
              name='partyName'
              value={formData.partyName}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label='العمر'
              name='age'
              type='number'
              value={formData.age}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label='المستوى التعليمي'
              name='educationLevel'
              value={formData.educationLevel}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography>المرفقات الحالية:</Typography>
            {existingImage && (
              <Box mb={2}>
                <Typography>الصورة الحالية:</Typography>
                <Box position="relative" width={200} height={200} mt={1}>
                  <Image
                    src={existingImage.startsWith('/') ? existingImage : `/${existingImage}`}
                    alt="Current Image"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Box>
            )}

            {existingCV && (
              <Box mb={2}>
                <Typography>السيرة الذاتية الحالية:</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => saveAs(getFullUrl(existingCV), 'سيرة_ذاتية.pdf')}
                  sx={{ mt: 1 }}
                >
                  تحميل السيرة الذاتية
                </Button>
              </Box>
            )}

            {existingEducationCertificate && (
              <Box mb={2}>
                <Typography>شهادة التعليم الحالية:</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => saveAs(getFullUrl(existingEducationCertificate), 'شهادة_تعليم.pdf')}
                  sx={{ mt: 1 }}
                >
                  تحميل شهادة التعليم
                </Button>
              </Box>
            )}

            <Box mt={2}>
              <input
                accept='image/*'
                style={{ display: 'none' }}
                id='image-upload'
                type='file'
                name='image'
                onChange={handleFileChange}
              />
              <label htmlFor='image-upload'>
                <Button variant='contained' component='span'>
                  تحميل صورة جديدة
                </Button>
              </label>
            </Box>

            <Box mt={2}>
              <input
                accept='.pdf,.doc,.docx'
                style={{ display: 'none' }}
                id='cv-upload'
                type='file'
                name='cv'
                onChange={handleFileChange}
              />
              <label htmlFor='cv-upload'>
                <Button variant='contained' component='span'>
                  تحميل سيرة ذاتية جديدة
                </Button>
              </label>
            </Box>

            <Box mt={2}>
              <input
                accept='.pdf,.doc,.docx'
                style={{ display: 'none' }}
                id='education-certificate-upload'
                type='file'
                name='educationCertificate'
                onChange={handleFileChange}
              />
              <label htmlFor='education-certificate-upload'>
                <Button variant='contained' component='span'>
                  تحميل شهادة تعليم جديدة
                </Button>
              </label>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography>تفاصيل البرنامج</Typography>
            <ReactQuill
              value={formData.programDetails}
              onChange={(value) => handleEditorChange('programDetails', value)}
              placeholder='أدخل تفاصيل البرنامج الانتخابي'
              style={{ height: '200px' }}
            />
            <Typography>الرؤية العامة</Typography>
            <ReactQuill
              value={formData.vision}
              onChange={(value) => handleEditorChange('vision', value)}
              placeholder='أدخل الرؤية العامة للبرنامج'
              style={{ height: '200px' }}
            />
            <Typography>الأهداف</Typography>
            <ReactQuill
              value={formData.goals}
              onChange={(value) => handleEditorChange('goals', value)}
              placeholder='أدخل الأهداف طويلة ومتوسطة وقصيرة المدى'
              style={{ height: '200px' }}
            />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography>الأولويات الاستراتيجية</Typography>
            <ReactQuill
              value={formData.priorities}
              onChange={(value) => handleEditorChange('priorities', value)}
              placeholder='أدخل الأولويات لكل لجنة'
              style={{ height: '200px' }}
            />
            <Typography>مؤشرات الأداء</Typography>
            <ReactQuill
              value={formData.kpis}
              onChange={(value) => handleEditorChange('kpis', value)}
              placeholder='أدخل مؤشرات الأداء'
              style={{ height: '200px' }}
            />
            <Typography>التعاون بين اللجان</Typography>
            <ReactQuill
              value={formData.collaboration}
              onChange={(value) => handleEditorChange('collaboration', value)}
              placeholder='أدخل آليات التعاون بين اللجان'
              style={{ height: '200px' }}
            />
            <Typography>آلية المتابعة والتقييم</Typography>
            <ReactQuill
              value={formData.trackingMechanism}
              onChange={(value) => handleEditorChange('trackingMechanism', value)}
              placeholder='أدخل آليات المتابعة والتقييم'
              style={{ height: '200px' }}
            />
            <Typography>البرامج المقترحة</Typography>
            <ReactQuill
              value={formData.proposedPrograms}
              onChange={(value) => handleEditorChange('proposedPrograms', value)}
              placeholder='أدخل البرامج المقترحة'
              style={{ height: '200px' }}
            />
          </Box>
        );
      default:
        return 'خطوة غير معروفة';
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <ToastContainer position='top-right' rtl={true} />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ p: 2 }}>
        {renderStepContent(activeStep)}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          العودة
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            تحديث
          </Button>
        ) : (
          <Button variant='contained' color='primary' onClick={handleNext}>
            التالي
          </Button>
        )}
      </Box>
    </Box>
  );
}

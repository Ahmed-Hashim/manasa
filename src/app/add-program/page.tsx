"use client";
import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Dynamically load ReactQuill for rich text fields
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Main Component
export default function AddProgram() {
  const steps = [
    "بيانات المرشح",
    "المرفقات",
    "تفاصيل البرنامج",
    "المؤشرات والتعاون",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
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

  const router = useRouter();

  // Handlers for changing input and file inputs
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

  const handleNext = () =>
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const data = new FormData();
    data.append("candidateName", formData.candidateName);
    data.append("partyName", formData.partyName);
    data.append("age", formData.age);
    data.append("educationLevel", formData.educationLevel);
    data.append("programDetails", formData.programDetails);
    data.append("vision", formData.vision);
    data.append("goals", formData.goals);
    data.append("priorities", formData.priorities);
    data.append("kpis", formData.kpis);
    data.append("collaboration", formData.collaboration);
    data.append("trackingMechanism", formData.trackingMechanism);
    data.append("proposedPrograms", formData.proposedPrograms);

    if (formData.image) data.append("image", formData.image);
    if (formData.cv) data.append("cv", formData.cv);
    if (formData.educationCertificate)
      data.append("educationCertificate", formData.educationCertificate);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/programs/programs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        toast.success("تم تقديم البرنامج بنجاح");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        // Parse the error response
        const errorData = await response.json();
        console.log(errorData);
        
        const errorMessage = errorData.message || "فشل تقديم البرنامج";
        toast.error(errorMessage);
      }
    } catch (error) {
      // Handle unexpected errors
      toast.error("حدث خطأ أثناء تقديم البرنامج");
    }
  };

  // Render Step Content
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              // label="اسم المرشح"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleInputChange}
              required
              fullWidth
              placeholder="اسم المرشح *"
              className="flex justify-end items-center text-right"
            />
            <TextField
              placeholder="اسم اللجنه *"
              className="flex justify-end items-center text-right"
              name="partyName"
              value={formData.partyName}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              placeholder="العمر *"
              className="flex justify-end items-center text-right"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              placeholder="المستوى التعليمي *"
              className="flex justify-end items-center text-right"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleInputChange}
              required
              fullWidth
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>رفع الملفات:</Typography>
            <Button variant="contained" component="label">
              صورة المرشح
              <input
                type="file"
                name="image"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <Button variant="contained" component="label">
              السيرة الذاتية (PDF)
              <input
                type="file"
                name="cv"
                accept="application/pdf"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            <Button variant="contained" component="label">
              شهادة التعليم (PDF)
              <input
                type="file"
                name="educationCertificate"
                accept="application/pdf"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} mb={10}>
            <Typography className="font-bold text-xl">تفاصيل البرنامج</Typography>
            <ReactQuill
              value={formData.programDetails}
              onChange={(value) => handleEditorChange("programDetails", value)}
              placeholder="أدخل تفاصيل البرنامج الانتخابي"
              style={{ height: "200px", paddingBottom: "80px" }}
            />
            <Typography className="font-bold text-xl">الرؤية العامة</Typography>
            <ReactQuill
              value={formData.vision}
              onChange={(value) => handleEditorChange("vision", value)}
              placeholder="أدخل الرؤية العامة للبرنامج"
              style={{ height: "200px", paddingBottom: "80px" }}
            />
            <Typography className="font-bold text-xl">الأهداف</Typography>
            <ReactQuill
              value={formData.goals}
              onChange={(value) => handleEditorChange("goals", value)}
              placeholder="أدخل الأهداف طويلة ومتوسطة وقصيرة المدى"
              style={{ height: "200px" }}
            />
          </Box>
        );
      case 3:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} mb={10}>
            <Typography className="font-bold text-xl">الأولويات الاستراتيجية</Typography>
            <ReactQuill
              value={formData.priorities}
              onChange={(value) => handleEditorChange("priorities", value)}
              placeholder="أدخل الأولويات لكل لجنة"
              style={{ height: "200px", paddingBottom: "80px" }}
            />
            <Typography className="font-bold text-xl">مؤشرات الأداء</Typography>
            <ReactQuill
              value={formData.kpis}
              onChange={(value) => handleEditorChange("kpis", value)}
              placeholder="أدخل مؤشرات الأداء"
              style={{ height: "200px", paddingBottom: "80px" }}
            />
            <Typography className="font-bold text-xl">التعاون بين اللجان</Typography>
            <ReactQuill
              value={formData.collaboration}
              onChange={(value) => handleEditorChange("collaboration", value)}
              placeholder="أدخل آليات التعاون بين اللجان"
              style={{ height: "200px", paddingBottom: "80px" }}
            />
            <Typography className="font-bold text-xl">آلية المتابعة والتقييم</Typography>
            <ReactQuill
              value={formData.trackingMechanism}
              onChange={(value) =>
                handleEditorChange("trackingMechanism", value)
              }
              placeholder="أدخل آليات المتابعة والتقييم"
              style={{ height: "200px", paddingBottom: "80px" }}
            />
            <Typography className="font-bold text-xl">البرامج المقترحة</Typography>
            <ReactQuill
              value={formData.proposedPrograms}
              onChange={(value) =>
                handleEditorChange("proposedPrograms", value)
              }
              placeholder="أدخل البرامج المقترحة"
              style={{ height: "200px" }}
            />
          </Box>
        );
      default:
        return "خطوة غير معروفة";
    }
  };

  return (
    <div className="container mt-8">
      <Card>
        <CardHeader className="text-center font-bold text-2xl">
          قم بادخال البيانات الخاصه بالبرنامج الانتخابي الخاص بك
        </CardHeader>
        <CardContent>
          <Box sx={{ width: "100%", mt: 4 }}>
            <ToastContainer position="top-right" rtl={true} />
            <Stepper activeStep={activeStep} alternativeLabel dir="ltr" className="mb-8">
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ p: 2 }}>{renderStepContent(activeStep)}</Box>

            <Box
              px={2}
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
                color="primary"
              >
                العودة
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  تقديم
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  التالي
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

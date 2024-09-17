"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AddProgram() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    candidateName: "",
    partyName: "",
    programDetails: "",
    image: null as File | null,
    cv: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log("تم التقديم:", formData);
    toast({
      title: "تم تقديم البرنامج",
      description: "تم تقديم برنامجك الانتخابي بنجاح.",
    });
    setFormData({
      candidateName: "",
      partyName: "",
      programDetails: "",
      image: null,
      cv: null,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">إضافة برنامج انتخابي</CardTitle>
        <CardDescription>
          قدم تفاصيل برنامجك الانتخابي هنا. جميع الحقول مطلوبة ما لم يذكر خلاف
          ذلك.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="candidateName">اسم المرشح</Label>
            <Input
              id="candidateName"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
              required
              placeholder="أدخل الاسم الكامل للمرشح"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="partyName">اسم الحزب</Label>
            <Input
              id="partyName"
              name="partyName"
              value={formData.partyName}
              onChange={handleChange}
              required
              placeholder="أدخل اسم الحزب السياسي"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">صورة المرشح (اختياري)</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cv">السيرة الذاتية للمرشح (اختياري)</Label>
            <Input
              id="cv"
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="programDetails">تفاصيل البرنامج</Label>
            <Textarea
              id="programDetails"
              name="programDetails"
              value={formData.programDetails}
              onChange={handleChange}
              required
              rows={10}
              placeholder="صف برنامجك الانتخابي بالتفصيل"
            />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>ماذا تضمن في برنامجك</AccordionTrigger>
                <AccordionContent>
                  <h1>
                    برنامج الأمين العام لمنصة الشباب العربي للتنمية المستدامة
                  </h1>

                  <div className="section">
                    <h2>1. الرؤية العامة للبرنامج</h2>
                    <p>
                      تتضمن الرؤية العامة للبرنامج تحديد الأهداف الاستراتيجية
                      والوسائل التي ستمكن المنصة من تحقيق التنمية المستدامة من
                      خلال التعاون بين اللجان المختلفة وتعزيز العمل الجماعي.
                    </p>
                  </div>

                  <div className="section">
                    <h2>2. الأهداف العامة</h2>
                    <ul>
                      <li>
                        <strong>الأهداف الطويلة المدى:</strong> تحديد أهداف
                        استراتيجية تسعى لتحقيق التنمية المستدامة على مدى خمس
                        سنوات.
                      </li>
                      <li>
                        <strong>الأهداف المتوسطة المدى:</strong> أهداف يمكن
                        تحقيقها في غضون سنتين إلى ثلاث سنوات.
                      </li>
                      <li>
                        <strong>الأهداف القصيرة المدى:</strong> أهداف سنوية أو
                        نصف سنوية.
                      </li>
                    </ul>
                  </div>

                  <div className="section">
                    <h2>3. الأولويات الاستراتيجية لكل لجنة فرعية</h2>

                    <div className="sub-section">
                      <h3>لجنة الموارد البشرية</h3>
                      <ul>
                        <li>
                          <strong>الإطار الزمني:</strong> تحديد مواعيد واضحة لكل
                          هدف.
                        </li>
                        <li>
                          <strong>كيفية التحقق:</strong> من خلال مراجعة الأداء
                          والتقارير الدورية.
                        </li>
                        <li>
                          <strong>الأشخاص المسؤولون:</strong> تعيين مسؤولين لكل
                          هدف ومتابعة تقدمهم.
                        </li>
                        <li>
                          <strong>مؤشرات القياس:</strong> استخدام مؤشرات أداء
                          محددة لتقييم التقدم.
                        </li>
                      </ul>
                    </div>

                    <div className="sub-section">
                      <h3>لجنة الإعلام</h3>
                      <p>
                        تحديد الاستراتيجيات الإعلامية والوسائل التي سيتم
                        استخدامها لنشر أهداف المنصة وتعزيز رسالتها.
                      </p>
                    </div>

                    <div className="sub-section">
                      <h3>لجنة الشؤون القانونية</h3>
                      <p>
                        تطوير السياسات والإجراءات القانونية لضمان الالتزام
                        بالقوانين المحلية والدولية.
                      </p>
                    </div>

                    <div className="sub-section">
                      <h3>لجنة العلاقات الخارجية</h3>
                      <p>
                        بناء وتعزيز العلاقات مع المنظمات الدولية والشركاء
                        الخارجيين.
                      </p>
                    </div>

                    <div className="sub-section">
                      <h3>لجنة العلاقات العامة</h3>
                      <p>
                        إدارة السمعة العامة للمنصة والتواصل مع المجتمع المحلي.
                      </p>
                    </div>

                    <div className="sub-section">
                      <h3>لجنة التنظيم</h3>
                      <p>تنظيم الفعاليات والأنشطة وضمان سير العمل بفعالية.</p>
                    </div>

                    <div className="sub-section">
                      <h3>لجنة متابعة أهداف التنمية المستدامة</h3>
                      <p>
                        رصد وتقييم التقدم المحرز في تحقيق أهداف التنمية
                        المستدامة.
                      </p>
                    </div>
                  </div>

                  <div className="section">
                    <h2>4. التكامل والتعاون بين اللجان</h2>
                    <p>
                      تحديد كيفية تعزيز التعاون بين اللجان المختلفة لضمان تحقيق
                      الأهداف المشتركة.
                    </p>
                  </div>

                  <div className="section">
                    <h2>5. كيفية تحديد مؤشرات قياس الأداء (KPIs)</h2>
                    <p>
                      تحديد مؤشرات الأداء الرئيسية التي ستستخدم لتقييم نجاح
                      الأنشطة والبرامج.
                    </p>
                  </div>

                  <div className="section">
                    <h2>6. آلية المتابعة المستمرة للتقدم</h2>
                    <p>
                      وضع خطة لمتابعة تقدم البرامج والأنشطة بانتظام لضمان تحقيق
                      الأهداف.
                    </p>
                  </div>

                  <div className="section">
                    <h2>7. البرامج المقترحة للمنصة</h2>
                    <p>
                      عرض البرامج المختلفة التي سيتم تنفيذها لتحقيق أهداف
                      المنصة، مع تقديم عرض تفصيلي لكل برنامج.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            تقديم البرنامج
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

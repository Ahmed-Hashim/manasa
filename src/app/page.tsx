"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import hero from "../../public/assets/hero-image.jpg";

export default function Home() {
  const heroImages = [hero];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt="Hero image"
              width={500} // Replace with the actual width of your image
              height={300} // Replace with the actual height of your image
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover", // This replaces the old objectFit prop
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-extrabold mb-4">
              شارك في صياغة مستقبل وطننا
            </h1>
            <p className="text-xl mb-8">
              انضم إلينا في بناء مجتمع أقوى وأكثر ازدهارًا. صوتك هو صوت الوطن.
            </p>
            {/* <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/candidates">استكشف المرشحين</Link>
            </Button> */}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-12">
              بوابتك للتصويت الواعي
            </h2>
            <div className="flex gap-8 items-center justify-center">
              {/* <Card className="bg-blue-50">
              <CardContent className="flex flex-col items-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 h-12 w-12 text-blue-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <h3 className="text-xl font-semibold mb-2">تعرف على المرشحين</h3>
                <p className="text-center text-muted-foreground mb-4">استكشف مجموعة متنوعة من المرشحين ورؤيتهم للمستقبل.</p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/candidates">عرض المرشحين</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-red-50">
              <CardContent className="flex flex-col items-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 h-12 w-12 text-red-600"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <h3 className="text-xl font-semibold mb-2">البرامج الانتخابية</h3>
                <p className="text-center text-muted-foreground mb-4">راجع البرامج الانتخابية المفصلة والمقترحات السياسية لكل مرشح.</p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/view-programs">عرض البرامج</Link>
                </Button>
              </CardContent>
            </Card> */}
              <Card className="bg-green-50">
                <CardContent className="flex flex-col items-center p-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-4 h-12 w-12 text-green-600"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">قدم برنامجك</h3>
                  <p className="text-center text-muted-foreground mb-4">
                    هل أنت مرشح؟ قدم برنامجك الانتخابي وتواصل مع الناخبين.
                  </p>
                  <Button
                    asChild
                    className="mt-auto bg-green-600 hover:bg-green-700"
                  >
                    <Link href="/add-program">إضافة برنامج</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

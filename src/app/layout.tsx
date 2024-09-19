// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";  // Import the Client layout

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "مركز الانتخابات",
  description: "منصة للمعلومات الانتخابية والمشاركة المدنية",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
        {/* Wrap ClientLayout here */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

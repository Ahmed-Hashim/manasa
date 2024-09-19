// src/components/ClientLayout.tsx
'use client'; // Client Component

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" forcedTheme="light" enableSystem>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <div className="mx-auto pb-8">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}

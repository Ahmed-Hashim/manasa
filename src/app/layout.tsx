import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

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
      <body
        className={`${inter.className} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <header className="px-10 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center">
                <div className="ml-4 hidden md:flex">
                  <Link href="/" className="ml-6 flex items-center space-x-2">
                    <span className="hidden font-bold sm:inline-block">
                      مركز الانتخابات
                    </span>
                  </Link>
                  <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="/add-program" className="ml-6">
                      إضافة برنامج
                    </Link>
                    <Link href="/view-programs" className="ml-6">
                      عرض البرامج
                    </Link>
                    <Link href="/candidates" className="ml-6">
                      المرشحون
                    </Link>
                    <Link href="/profile" className="ml-6">
                      الملف الشخصي
                    </Link>
                    <Link href="/admin/review" className="ml-6">
                      مراجعة البرامج (الإدارة)
                    </Link>
                  </nav>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-auto h-8 w-8 px-0 md:hidden"
                >
                  <span className="sr-only">القائمة</span>
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
                  >
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <line x1="3" x2="21" y1="12" y2="12" />
                    <line x1="3" x2="21" y1="18" y2="18" />
                  </svg>
                </Button>
                <div className="flex items-center space-x-4 ml-auto">
                  <ModeToggle />
                  <Link href="/signin">
                    <Button variant="outline">تسجيل الدخول</Button>
                  </Link>
                </div>
              </div>
            </header>
            <main className="flex-1">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
            <footer className="bg-gray-900 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-3">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">من نحن</h4>
                    <p className="text-gray-400">
                      مركز الانتخابات ملتزم بتعزيز عملية ديمقراطية شفافة
                      ومستنيرة. نوفر منصة للمرشحين لمشاركة رؤيتهم وللناخبين
                      لاتخاذ قرارات مدروسة.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/candidates"
                          className="text-gray-400 hover:text-white"
                        >
                          المرشحون
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/view-programs"
                          className="text-gray-400 hover:text-white"
                        >
                          البرامج الانتخابية
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/add-program"
                          className="text-gray-400 hover:text-white"
                        >
                          تقديم برنامج
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile"
                          className="text-gray-400 hover:text-white"
                        >
                          الملف الشخصي
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/admin/review"
                          className="text-gray-400 hover:text-white"
                        >
                          مراجعة البرامج (الإدارة)
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">اتصل بنا</h4>
                    <p className="text-gray-400">
                      123 شارع الديمقراطية
                      <br />
                      القاهرة
                      <br />
                      مصر
                    </p>
                    <p className="text-gray-400 mt-2">
                      البريد الإلكتروني: info@electionhub.com
                      <br />
                      الهاتف: 0123456789
                    </p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                  <p>© {new Date().getFullYear()} مركز الانتخابات. جميع الحقوق محفوظة.</p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
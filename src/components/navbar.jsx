"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import defaultUser from "../../public/assets/default-avatar.png";
import logo from "../../public/assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if(status === "authenticated") {


      
      window.localStorage.setItem("token", session.user.token)
      // setExistingImage(session?.user?.imageUrl ? data.image.replace(/\\/g, '/').replace(/^\/?public\//, '/') : null);
    }
  }, [status])

  const handleSignOut = () => {
    signOut({ callbackUrl: "/signin" });
  };

  const userImageSrc = session?.user?.imageUrl
    ? `/${session.user.imageUrl.replace(/^public\\/, '').replace(/\\/g, '/')}`
    : defaultUser;

  return (
    <nav className="bg-white sticky top-0 z-50 w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src={logo}
                className="w-12 h-12"
                alt="منصة الشباب العربي"
              />
            </Link>
            <span className="text-2xl font-bold text-green-900">
              منصة الشباب العربي
            </span>
          </div>

          {/* Desktop Menu */}
          {/* <div className="hidden md:block">
            <div className="ml-10 flex items-baseline text-primary space-x-4">
              <Link
                href="/"
                className="text-text hover:text-green px-3 py-2 rounded-md text-sm font-medium"
              >
                الرئيسية
              </Link>
              <Link
                href="/add-program"
                className="text-text hover:text-green px-3 py-2 rounded-md text-sm font-medium"
              >
                إضافة برنامج
              </Link>
              <Link
                href="/view-programs"
                className="text-text hover:text-green px-3 py-2 rounded-md text-sm font-medium"
              >
                عرض البرامج
              </Link>
              <Link
                href="/candidates"
                className="text-text hover:text-green px-3 py-2 rounded-md text-sm font-medium"
              >
                المرشحون
              </Link>
            </div>
          </div> */}

          {/* Right Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex gap-5 items-center md:ml-6">
              {/* <ModeToggle /> */}
              <ModeToggle ModeToggle />
              {status === "authenticated" && session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex gap-2 items-center space-x-2 cursor-pointer">
                      <Image
                        src={`${userImageSrc}`}
                        alt="User Profile"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-accent"
                      />
                      <span className="text-sm font-medium text-text">
                        {session.user.name}
                      </span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-background text-text"
                  >
                    <DropdownMenuItem>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-200 rounded"
                      >
                        الملف الشخصي
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer"
                    >
                      تسجيل الخروج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/signin">
                    <Button
                      variant="ghost"
                      className="ml-4 text-text hover:text-accent"
                    >
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      variant="default"
                      className="ml-4 bg-accent hover:bg-hover text-primary"
                    >
                      التسجيل
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-primary inline-flex items-center justify-center p-2 rounded-md text-accent hover:text-white hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>


      {isOpen && (
        <div className="md:hidden bg-primary" id="mobile-menu">
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              {status === "authenticated" && session?.user ? (
                <div className="flex-shrink-0">
                  <Image
                    src={session.user.image || defaultUser}
                    alt="User Profile"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-accent"
                  />
                </div>
              ) : null}
              <div className="ml-3">
                {status === "authenticated" && session?.user ? (
                  <>
                    <div className="text-base font-medium text-text">
                      {session.user.name}
                    </div>
                    <div className="text-sm font-medium text-text">
                      {session.user.email}
                    </div>
                  </>
                ) : null}
              </div>
              <div className="ml-auto">
                <ModeToggle />
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {status === "authenticated" && session?.user ? (
                <>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-accent hover:bg-hover hover:text-white"
                  >
                    الملف الشخصي
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-accent hover:bg-hover hover:text-white"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <Link href="/signin">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-accent hover:text-white"
                    >
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      variant="default"
                      className="w-full justify-start mt-2 bg-accent hover:bg-hover text-primary"
                    >
                      التسجيل
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "react-toastify";
import defaultUser from "../../../public/assets/default-avatar.png";

interface User {
  name: string;
  email: string;
  bio: string;
  partyName: string;
  image?: string;
}


export default function Profile() {
  const { data: session, update } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;

    const userId = session.user.id; // Get userId from session

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        toast.error("An error occurred while fetching user data");
      }
    };

    fetchUser();
  }, [session]);
  const userImageSrc = session?.user?.imageUrl
  ? `/${session.user.imageUrl.replace(/^public\\/, '').replace(/\\/g, '/')}`
  : defaultUser;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile);
    }
    formData.append('name', user?.name || '');
    formData.append('email', user?.email || '');
    formData.append('bio', user?.bio || '');
    formData.append('party', user?.partyName || '');
    formData.append('userId', session?.user.id || '');

    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });

      if (response.ok) {
        const updatedUser = await response.json();
        await update({
          ...session,
          user: {
            ...session?.user,
            name: updatedUser.name,
            email: updatedUser.email,
            imageUrl: updatedUser.image,
          },
        });
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">الملف الشخصي</h1>
      <div className="">
        <Card className="lg:w-[50vw] md:w-[70vw] w-[90vw] mx-auto">
          <CardHeader>
            <CardTitle>المعلومات الشخصية</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 gap-5">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={userImageSrc || undefined}
                      alt={session?.user.name || "User"}
                    />
                    <AvatarFallback>
                      {session?.user.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload">
                    <span className="py-3 px-3 bg-black text-white capitalize rounded-lg cursor-pointer hover:bg-black/75 duration-300 font-bold text-xs">تغيير الصورة</span>
                  </label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة شخصية</Label>
                  <Textarea
                    id="bio"
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="party">اللجنة</Label>
                  <Input
                    id="party"
                    value={user.partyName}
                    onChange={(e) => setUser({ ...user, partyName: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">
                حفظ التغييرات
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
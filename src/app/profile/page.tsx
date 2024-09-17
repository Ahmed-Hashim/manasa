'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock user data for demonstration
const mockUser = {
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  image: 'https://i.pravatar.cc/150?img=3',
  bio: 'مرشح طموح يسعى لتحسين مجتمعنا',
  party: 'حزب التقدم',
  programs: [
    { id: 1, title: 'برنامج التعليم', status: 'قيد المراجعة' },
    { id: 2, title: 'برنامج الصحة', status: 'مقبول' },
  ]
}

export default function Profile() {
  const [user, setUser] = useState(mockUser)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated profile data to your backend
    console.log('Updating profile:', user)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">الملف الشخصي</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>المعلومات الشخصية</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <Button>تغيير الصورة</Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input 
                    id="name" 
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">نبذة شخصية</Label>
                  <Textarea 
                    id="bio"
                    value={user.bio}
                    onChange={(e) => setUser({...user, bio: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="party">الحزب</Label>
                  <Input 
                    id="party"
                    value={user.party}
                    onChange={(e) => setUser({...user, party: e.target.value})}
                  />
                </div>
              </div>
              <Button type="submit" className="mt-4">حفظ التغييرات</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>البرامج الانتخابية</CardTitle>
          </CardHeader>
          <CardContent>
            {user.programs.map((program) => (
              <div key={program.id} className="mb-4 p-4 border rounded">
                <h3 className="font-semibold">{program.title}</h3>
                <p>الحالة: {program.status}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button>إضافة برنامج جديد</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
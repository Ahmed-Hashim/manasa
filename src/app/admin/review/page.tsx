'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

// Define the Program type
type Program = {
  id: number
  candidateName: string
  partyName: string
  programDetails: string
}

// Mock data for demonstration
const mockPrograms: Program[] = [
  { id: 1, candidateName: 'أحمد محمد', partyName: 'حزب التقدم', programDetails: 'برنامج لتطوير التعليم والصحة' },
  { id: 2, candidateName: 'فاطمة علي', partyName: 'حزب المستقبل', programDetails: 'خطة لتحسين البنية التحتية' },
  // Add more mock programs as needed
]

export default function AdminReview() {
  const [programs] = useState<Program[]>(mockPrograms)
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [comment, setComment] = useState('')

  const handleReview = (program: Program) => {
    setSelectedProgram(program)
    setComment('')
  }

  const handleSubmitReview = () => {
    console.log('Submitting review for program:', selectedProgram?.id, 'Comment:', comment)
    // Here you would typically send the review to your backend
    setSelectedProgram(null)
    setComment('')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">مراجعة البرامج الانتخابية</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">البرامج المقدمة</h2>
          {programs.map((program) => (
            <Card key={program.id} className="mb-4">
              <CardHeader>
                <CardTitle>{program.candidateName} - {program.partyName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{program.programDetails}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleReview(program)}>مراجعة</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div>
          {selectedProgram && (
            <Card>
              <CardHeader>
                <CardTitle>مراجعة البرنامج</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold">{selectedProgram.candidateName} - {selectedProgram.partyName}</h3>
                <p className="mb-4">{selectedProgram.programDetails}</p>
                <div className="space-y-2">
                  <Label htmlFor="comment">التعليق</Label>
                  <Textarea
                    id="comment"
                    placeholder="أدخل تعليقك هنا"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmitReview}>إرسال المراجعة</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

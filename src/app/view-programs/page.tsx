'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// بيانات وهمية للعرض
const mockPrograms = [
  { id: 1, candidateName: 'أحمد محمد', partyName: 'حزب التقدم', programDetails: 'التركيز على إصلاح التعليم والرعاية الصحية. نهدف إلى زيادة التمويل للمدارس العامة وتنفيذ نظام رعاية صحية شامل.' },
  { id: 2, candidateName: 'فاطمة علي', partyName: 'حزب المحافظين', programDetails: 'التركيز على النمو الاقتصادي وخلق فرص العمل. تتضمن خطتنا تخفيضات ضريبية للشركات الصغيرة ومشاريع تطوير البنية التحتية.' },
  { id: 3, candidateName: 'محمود حسن', partyName: 'الحزب الأخضر', programDetails: 'إعطاء الأولوية لحماية البيئة والطاقة المستدامة. نقترح أهداف خفض انبعاثات الكربون بشكل كبير والاستثمار في مصادر الطاقة المتجددة.' },
]

export default function ViewPrograms() {
  const [programs] = useState(mockPrograms)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPrograms = programs.filter(program =>
    program.candidateName.includes(searchTerm) ||
    program.partyName.includes(searchTerm) ||
    program.programDetails.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">البرامج الانتخابية</h2>
      <Input
        type="search"
        placeholder="ابحث في البرامج..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{program.candidateName}</CardTitle>
              <Badge variant="secondary">{program.partyName}</Badge>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">{program.programDetails}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredPrograms.length === 0 && (
        <p className="text-center text-muted-foreground">لم يتم العثور على برامج تطابق بحثك.</p>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

// بيانات وهمية للعرض
const mockCandidates = [
  {
    id: 1,
    name: 'أحمد محمد',
    party: 'حزب التقدم',
    bio: 'خبرة في الحكومة المحلية، مع التركيز على تنمية المجتمع وبرامج الرعاية الاجتماعية.',
    image: 'https://i.pravatar.cc/300?img=1',
    cv: '/ahmed-mohamed-cv.pdf',
    programDetails: `
      المواقف السياسية الرئيسية:
      1. إصلاح التعليم: زيادة التمويل للمدارس العامة وتنفيذ برامج تدريب شاملة للمعلمين.
      2. الرعاية الصحية: العمل نحو نظام رعاية صحية شامل يضمن رعاية جيدة لجميع المواطنين.
      3. حماية البيئة: تنفيذ لوائح أكثر صرامة على الانبعاثات الصناعية وتعزيز مبادرات الطاقة المتجددة.
      
      أهداف محددة:
      - خفض معدل البطالة بنسبة 2٪ خلال العامين الأولين من المنصب.
      - زيادة ميزانية أبحاث الطاقة المتجددة بنسبة 50٪.
      - تنفيذ برنامج إعادة تدوير على مستوى المدينة لتقليل النفايات في المكبات بنسبة 30٪.
      
      المؤهلات:
      - ماجستير في الإدارة العامة
      - 8 سنوات من الخبرة كعضو في مجلس المدينة
      - قاد مبادرة ناجحة لإحياء وسط المدينة، مما أدى إلى زيادة بنسبة 20٪ في إيرادات الأعمال المحلية
      
      الرؤية:
      لخلق مجتمع مزدهر ومستدام حيث يتمتع كل مواطن بالوصول إلى تعليم جيد ورعاية صحية وفرص عمل. نهدف إلى أن نكون مدينة نموذجية للإشراف البيئي والنمو الاقتصادي الشامل.
    `
  },
  {
    id: 2,
    name: 'فاطمة علي',
    party: 'حزب المحافظين',
    bio: 'قائدة أعمال ذات خلفية اقتصادية قوية، تدعو إلى المسؤولية المالية ونمو الوظائف.',
    image: 'https://i.pravatar.cc/300?img=2',
    cv: '/fatima-ali-cv.pdf',
    programDetails: `
      المواقف السياسية الرئيسية:
      1. النمو الاقتصادي: تنفيذ تخفيضات ضريبية للشركات الصغيرة وجذب صناعات جديدة إلى منطقتنا.
      2. المسؤولية المالية: تدقيق جميع الإدارات الحكومية للقضاء على الهدر وتقليل الإنفاق العام.
      3. السلامة العامة: زيادة التمويل لتطبيق القانون وتنفيذ برامج الشرطة المجتمعية.
      
      أهداف محددة:
      - خلق 5000 وظيفة جديدة خلال الفترة الأولى من خلال جذب شركات التكنولوجيا إلى مدينتنا.
      - تقليل الإنفاق الحكومي بنسبة 10٪ دون المساس بالخدمات الأساسية.
      - خفض معدل الجريمة بنسبة 15٪ من خلال زيادة وجود الشرطة وبرامج المشاركة المجتمعية.
      
      المؤهلات:
      - ماجستير في إدارة الأعمال من كلية أعمال مرموقة
      - 15 عامًا من الخبرة كرئيس تنفيذي لشركة من قائمة فورتشن 500
      - عضو في مجلس التنمية الاقتصادية بالمدينة لمدة 5 سنوات
      
      الرؤية:
      لتحويل مدينتنا إلى قوة اقتصادية تجذب الأعمال وتخلق فرص العمل وتوفر الفرص لجميع المواطنين. سنحقق ذلك مع الحفاظ على المسؤولية المالية وضمان سلامة وأمن مجتمعاتنا.
    `
  },
  {
    id: 3,
    name: 'محمود حسن',
    party: 'الحزب الأخضر',
    bio: 'عالم بيئة ملتزم بالسياسات المستدامة ومبادرات الطاقة المتجددة.',
    image: 'https://i.pravatar.cc/300?img=3',
    cv: '/mahmoud-hassan-cv.pdf',
    programDetails: `
      المواقف السياسية الرئيسية:
      1. العمل المناخي: وضع أهداف طموحة لخفض انبعاثات الكربون والاستثمار بكثافة في الطاقة المتجددة.
      2. البنية التحتية الخضراء: تطوير وسائل نقل عام صديقة للبيئة وتنفيذ معايير البناء الأخضر.
      3. الحفاظ على البيئة: حماية النظم البيئية المحلية وتوسيع المساحات الخضراء داخل المدينة.
      
      أهداف محددة:
      - تحقيق استخدام 50٪ من الطاقة المتجددة للمدينة خلال 5 سنوات.
      - زراعة 100,000 شجرة وإنشاء 10 حدائق مجتمعية جديدة في الفترة الأول
      - تقليل البصمة الكربونية للمدينة بنسبة 30٪ من خلال المبادرات الخضراء وحملات التوعية العامة.
      
      المؤهلات:
      - دكتوراه في العلوم البيئية
      - 10 سنوات من الخبرة في قيادة منظمة غير ربحية تركز على الاستدامة الحضرية
      - مؤلف منشور حول استراتيجيات التخفيف من تغير المناخ
      
      الرؤية:
      لتحويل مدينتنا إلى عاصمة خضراء ومستدامة تقود الطريق في حماية البيئة واعتماد الطاقة النظيفة. نهدف إلى إنشاء نموذج للحياة الحضرية يتناغم مع الطبيعة، مما يوفر جودة حياة عالية للسكان مع الحفاظ على كوكبنا للأجيال القادمة.
    `
  },
]

export default function Candidates() {
  const [candidates] = useState(mockCandidates)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.includes(searchTerm) ||
    candidate.party.includes(searchTerm) ||
    candidate.bio.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">المرشحون</h2>
      <Input
        type="search"
        placeholder="ابحث عن المرشحين..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={candidate.image} alt={candidate.name} />
                  <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{candidate.name}</CardTitle>
                  <Badge variant="outline" className="mt-1">{candidate.party}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">{candidate.bio}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">عرض الملف الشخصي</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>{candidate.name} - ملف المرشح</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={candidate.image} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-2xl font-bold">{candidate.name}</h3>
                          <Badge variant="outline" className="mt-1">{candidate.party}</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">السيرة الذاتية</h4>
                        <p>{candidate.bio}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">تفاصيل البرنامج</h4>
                        <pre className="whitespace-pre-wrap text-sm">{candidate.programDetails}</pre>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">السيرة الذاتية</h4>
                        <Button asChild>
                          <a href={candidate.cv} target="_blank" rel="noopener noreferrer">عرض السيرة الذاتية</a>
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" asChild>
                <a href={`mailto:${candidate.name.toLowerCase().replace(' ', '.')}@example.com`}>اتصل</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredCandidates.length === 0 && (
        <p className="text-center text-muted-foreground">لم يتم العثور على مرشحين يطابقون بحثك.</p>
      )}
    </div>
  )
}
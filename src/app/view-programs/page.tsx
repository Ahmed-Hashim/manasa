'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import { Program } from '../types/types';

export default function ViewPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/programs/view-programs', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();

  }, []);
  console.log("programs:",programs);
  
  return (
    <Card className="max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">البرامج المتاحة</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>جاري تحميل البرامج...</p>
        ) : (
          <ul>
            {programs.map((program) => (
              <li key={program.id} className="mb-4">
                
                {program.user && <p>قدم بواسطة: {program.user.name}</p>}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

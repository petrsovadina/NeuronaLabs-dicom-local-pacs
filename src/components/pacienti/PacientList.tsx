'use client';

import { useQuery } from '@apollo/client';
import { GET_PATIENTS } from '@/graphql/queries';
import Link from 'next/link';

export function PacientList() {
  const { data, loading, error } = useQuery(GET_PATIENTS);

  if (loading) return <div>Načítání...</div>;
  if (error) return <div>Chyba: {error.message}</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.patients.map((patient: any) => (
        <div key={patient.id} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{patient.name}</h2>
          <p className="text-gray-600">Věk: {patient.age}</p>
          <p className="text-gray-600 mb-4">Poslední diagnóza: {patient.lastDiagnosis}</p>
          <Link 
            href={`/pacienti/${patient.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            Zobrazit detail
          </Link>
        </div>
      ))}
    </div>
  );
}

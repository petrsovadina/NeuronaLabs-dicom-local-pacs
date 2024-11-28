'use client';

import { useQuery } from '@apollo/client';
import { GET_PATIENTS } from '@/graphql/queries';
import { Patient } from '@/types/patient';
import { Button } from './ui/button';
import Link from 'next/link';

export function PatientList() {
  const { loading, error, data } = useQuery(GET_PATIENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <div className="grid gap-4">
        {data.patients.map((patient: Patient) => (
          <div key={patient.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{patient.name}</h2>
            <p>Age: {patient.age}</p>
            <p>Last Diagnosis: {patient.lastDiagnosis}</p>
            <Link href={`/patient/${patient.id}`}>
              <Button className="mt-2">
                View Details
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
       </div>
        ))}
      </div>
    </div>
  );
}

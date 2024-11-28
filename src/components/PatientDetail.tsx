'use client';

import { useQuery } from '@apollo/client';
import { GET_PATIENT } from '@/graphql/queries';

export function PatientDetail({ id }: { id: string }) {
  const { loading, error, data } = useQuery(GET_PATIENT, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { patient } = data;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{patient.name}</h1>
      <div className="grid gap-4">
        <div className="border p-4 rounded-lg shadow">
          <p>Age: {patient.age}</p>
          <p>Last Diagnosis: {patient.lastDiagnosis}</p>
        </div>

        <h2 className="text-xl font-semibold mt-4">Diagnostic History</h2>
        {patient.diagnosticResults?.map((result: any) => (
          <div key={result.id} className="border p-4 rounded-lg shadow">
            <p>Date: {new Date(result.date).toLocaleDateString()}</p>
            <p>Diagnosis: {result.diagnosis}</p>
            {result.imageUrl && (
              <img 
                src={result.imageUrl} 
                alt="Diagnostic Image" 
                className="mt-2 max-w-full h-auto"
              />
            )}
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

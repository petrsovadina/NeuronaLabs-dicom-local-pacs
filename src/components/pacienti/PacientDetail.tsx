'use client';

import { useQuery } from '@apollo/client';
import { GET_PATIENT } from '@/graphql/queries';
import { DicomViewer } from '@/components/dicom/DicomViewer';

export function PacientDetail({ id }: { id: string }) {
  const { data, loading, error } = useQuery(GET_PATIENT, {
    variables: { id }
  });

  if (loading) return <div>Načítání...</div>;
  if (error) return <div>Chyba: {error.message}</div>;

  const { patient } = data;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{patient.name}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Základní informace</h2>
        <p className="mb-2">Věk: {patient.age}</p>
        <p>Poslední diagnóza: {patient.lastDiagnosis}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Historie vyšetření</h2>
        {patient.diagnosticResults?.map((result: any) => (
          <div key={result.id} className="mb-4 p-4 border rounded">
            <p className="mb-2">Datum: {new Date(result.date).toLocaleDateString('cs-CZ')}</p>
            <p className="mb-2">Diagnóza: {result.diagnosis}</p>
            {result.imageUrl && (
              <DicomViewer imageUrl={result.imageUrl} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DIAGNOSTIC_RESULT } from '@/graphql/mutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface AddDiagnosticFormProps {
  patientId: string;
  onSuccess?: () => void;
}

export function AddDiagnosticForm({ patientId, onSuccess }: AddDiagnosticFormProps) {
  const [diagnosis, setDiagnosis] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const [addDiagnostic, { loading }] = useMutation(ADD_DIAGNOSTIC_RESULT, {
    onCompleted: () => {
      toast({
        title: 'Vyšetření přidáno',
        description: 'Nové vyšetření bylo úspěšně uloženo.'
      });
      setDiagnosis('');
      setFile(null);
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: 'Chyba',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDiagnostic({
        variables: {
          patientId,
          diagnosis,
          image: file
        }
      });
    } catch (error) {
      console.error('Error adding diagnostic:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
          Diagnóza
        </label>
        <Textarea
          id="diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          required
          className="mt-1"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          DICOM snímek
        </label>
        <Input
          id="image"
          type="file"
          accept=".dcm"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-1"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Ukládání...' : 'Přidat vyšetření'}
      </Button>
    </form>
  );
}

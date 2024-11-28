'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PATIENT } from '@/graphql/mutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export function CreatePatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    lastDiagnosis: ''
  });

  const { toast } = useToast();
  const [createPatient, { loading }] = useMutation(CREATE_PATIENT, {
    onCompleted: () => {
      toast({
        title: 'Pacient vytvořen',
        description: 'Nový pacient byl úspěšně přidán do systému.'
      });
      setFormData({ name: '', age: '', lastDiagnosis: '' });
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
      await createPatient({
        variables: {
          name: formData.name,
          age: parseInt(formData.age),
          lastDiagnosis: formData.lastDiagnosis
        }
      });
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Jméno pacienta
        </label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Věk
        </label>
        <Input
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="lastDiagnosis" className="block text-sm font-medium text-gray-700">
          Poslední diagnóza
        </label>
        <Input
          id="lastDiagnosis"
          type="text"
          value={formData.lastDiagnosis}
          onChange={(e) => setFormData({ ...formData, lastDiagnosis: e.target.value })}
          required
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Ukládání...' : 'Vytvořit pacienta'}
      </Button>
    </form>
  );
}

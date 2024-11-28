import { Suspense } from 'react';
import { CreatePatientForm } from '@/components/forms/CreatePatientForm';
import { PatientList } from '@/components/pacienti/PatientList';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function PacientiPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Seznam pacientů</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>Přidat pacienta</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nový pacient</DialogTitle>
            </DialogHeader>
            <CreatePatientForm />
          </DialogContent>
        </Dialog>
      </div>

      <Suspense fallback={<div>Načítání...</div>}>
        <PatientList />
      </Suspense>
    </div>
  );
}

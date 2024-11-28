import { Suspense } from 'react';
import { PatientDetail } from '@/components/pacienti/PatientDetail';
import { AddDiagnosticForm } from '@/components/forms/AddDiagnosticForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Detail pacienta</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>Přidat vyšetření</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nové vyšetření</DialogTitle>
            </DialogHeader>
            <AddDiagnosticForm patientId={params.id} />
          </DialogContent>
        </Dialog>
      </div>

      <Suspense fallback={<div>Načítání...</div>}>
        <PatientDetail id={params.id} />
      </Suspense>
    </div>
  );
}

import { PatientDetail } from '@/components/PatientDetail'

export default function PatientPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen p-4">
      <PatientDetail id={params.id} />
    </main>
  )
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  lastDiagnosis: string;
  diagnosticResults?: DiagnosticResult[];
}

export interface DiagnosticResult {
  id: string;
  date: string;
  diagnosis: string;
  imageUrl?: string;
}

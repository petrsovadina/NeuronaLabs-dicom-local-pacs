import { gql } from '@apollo/client';

export const CREATE_PATIENT = gql`
  mutation CreatePatient($name: String!, $age: Int!, $lastDiagnosis: String!) {
    createPatient(name: $name, age: $age, lastDiagnosis: $lastDiagnosis) {
      id
      name
      age
      lastDiagnosis
    }
  }
`;

export const ADD_DIAGNOSTIC_RESULT = gql`
  mutation AddDiagnosticResult($patientId: ID!, $diagnosis: String!, $image: Upload) {
    addDiagnosticResult(patientId: $patientId, diagnosis: $diagnosis, image: $image) {
      id
      diagnosis
      imageUrl
      date
    }
  }
`;

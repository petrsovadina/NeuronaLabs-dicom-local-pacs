import { gql } from '@apollo/client';

export const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      name
      age
      lastDiagnosis
    }
  }
`;

export const GET_PATIENT = gql`
  query GetPatient($id: ID!) {
    patient(id: $id) {
      id
      name
      age
      lastDiagnosis
      diagnosticResults {
        id
        date
        diagnosis
        imageUrl
      }
    }
  }
`;

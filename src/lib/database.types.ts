export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string
          name: string
          age: number
          last_diagnosis: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          age: number
          last_diagnosis: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          age?: number
          last_diagnosis?: string
          created_at?: string
          updated_at?: string
        }
      }
      diagnostic_results: {
        Row: {
          id: string
          patient_id: string
          diagnosis: string
          image_url: string | null
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          diagnosis: string
          image_url?: string | null
          date?: string
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          diagnosis?: string
          image_url?: string | null
          date?: string
          created_at?: string
        }
      }
    }
  }
}

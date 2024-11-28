'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type Patient = Database['public']['Tables']['patients']['Row']

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setPatients(data)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  const addPatient = async (newPatient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([newPatient])
        .select()

      if (error) throw error

      setPatients(prev => [...(data as Patient[]), ...prev])
      return data
    } catch (e) {
      setError(e as Error)
      throw e
    }
  }

  return { patients, loading, error, addPatient }
}

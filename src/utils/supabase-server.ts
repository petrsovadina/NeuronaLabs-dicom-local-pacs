import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

export function createServerSupabase() {
  return createServerComponentClient<Database>({ cookies })
}

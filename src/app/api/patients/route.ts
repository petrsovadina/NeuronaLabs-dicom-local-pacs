import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  const { data: patients, error } = await supabase
    .from('patients')
    .select(`
      *,
      diagnostic_results (*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(patients)
}

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const json = await request.json()

  const { data, error } = await supabase
    .from('patients')
    .insert([json])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

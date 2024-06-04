import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function Dashboard() {
  const supabase = createClient()

  // log user in
  const { data, error } = await supabase.auth.getUser()
  
  // throw error
  if (error || !data?.user) {
    redirect('/login')
  }

  console.log('data: ', data)

  return <p>Hello {data.user.email}</p>
}
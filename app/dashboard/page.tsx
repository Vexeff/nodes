import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Dashboard from '@/components/dashboard/Dashboard'

export default async function UserProfile() {
  const supabase = createClient()

  // log user in
  const { data, error } = await supabase.auth.getUser()
  
  // throw error
  if (error || !data?.user) {
    redirect('/login')
  }

  //console.log('user data: ', data)

  return (
    <div>
      <p>Hello, {data.user.user_metadata.username}!</p>
      <Dashboard user_id={data.user.id} />
    </div>)
}
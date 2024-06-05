import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import TodoList from '@/components/TodoList'
import Logout from '@/components/Logout'

export default async function UserProfile() {
  const supabase = createClient()

  // log user in
  const { data, error } = await supabase.auth.getUser()
  
  // throw error
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main className='flex flex-col min-h-screen space-y-4'>
      <div className='flex flex-row max-h-12 mt-10 min-w-full justify-content-center align-baseline'>
        <p className=' inline-block w-full ml-5 text-start h-full'>Hello, {data.user.user_metadata.username}</p>
        <Logout />
      </div>
      
      <div className='flex flex-col min-w-full'>
        <p className='flex place-content-center'>
          Your to-do list:
        </p>
        <div className='flex min-w-full place-content-center'>
          <TodoList user={data.user} />
        </div>
         
      </div>
    </main>
    )
}
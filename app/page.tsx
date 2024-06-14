import Link from 'next/link'
import Leaderboard from '@/components/Leaderboard'
import { createClient } from '@supabase/supabase-js';
import { userScore } from "@/utils/types";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleSecret = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const revalidate = 60

export default async function Home() {
  const supabase = createClient(supabaseUrl, serviceRoleSecret, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const { data, error } = await supabase
    .from('profiles')
    .select(`
        username,
        user_xps (
          total_xp
        )
      `)
    .limit(10)
    .order('user_xps(total_xp)', { ascending: false })
    
    // @ts-expect-error
    let scores: userScore[] = data?.map((score) => ({'username': score.username, 'total_xp': score.user_xps.total_xp}))! 
    
    if (error){
      scores = [{'username': 'Error fetching data', 'total_xp': 0}]
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='grid'>
        <div className="flex flex-col text-center">
          This is the start of your productive life.
        </div>
        <div className='flex flex-col place-items-center mt-5'>
          <Link  className='p-2 border-neutral-800 border-2 hover:bg-black hover:duration-300 hover:text-white dark:hover:bg-white' href="/login">
            <p className=' text-center max-w-[90%] dark:text-white dark:hover:text-black hover:duration-300'>
              Click to login!
            </p>
          </Link>
        </div>

        <div className='flex flex-col place-items-center mt-10'>
          <Leaderboard scores={scores}/>
       </div>
      
      </div>
    </main>
  );
}

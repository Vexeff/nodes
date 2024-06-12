import Link from 'next/link'
import Leaderboard from '@/components/Leaderboard'

export default function Home() {
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
          <Leaderboard />
       </div>
      
      </div>
    </main>
  );
}

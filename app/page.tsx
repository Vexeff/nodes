import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='grid'>
        <div className="flex flex-col">
          This is the start of your productive life!
        </div>
        <div className='flex flex-col place-items-center mt-3'>
          <Link  className='bg-green-300 rounded-3xl max-w-32' href="/login">
            <p className=' text-center max-w-[90%]'>
              Click to login!
            </p>
          </Link>
        </div>
      </div>
      
     
    </main>
  );
}

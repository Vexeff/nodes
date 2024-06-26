import { signup } from '../../utils/auth_actions'

export default function SignupPage() {
  return (
    <main className='flex flex-col min-w-max min-h-screen'>

    <form className='flex flex-col place-items-center'>
        <div className='flex flex-col my-10 space-y-5 md:flex-row md:space-y-0 md:space-x-5'>
            <label className='flex' htmlFor="email">Email:</label>
            <input className='flex dark:text-black' id="email" name="email" type="email" required />
            <label className='flex'  htmlFor="password">Password:</label>
            <input className='flex dark:text-black'  id="password" name="password" type="password" required />
        </div>
        <div className='flex flex-col mb-10 space-y-5 md:flex-row md:space-y-0 md:space-x-5'>
            <label className='flex'  htmlFor="username">Username:</label>
            <input className='flex dark:text-black'  id="username" name="username" type="username" required />
        </div>
        <div className='flex flex-row space-x-5 '>
            <button className='p-2 border-neutral-800 dark:border-neutral-500 border-2 hover:bg-black hover:duration-300 hover:text-white dark:hover:bg-white dark:text-white dark:hover:text-black' formAction={signup}>Sign up</button>
        </div>
      
    </form>
    </main>
  )
}
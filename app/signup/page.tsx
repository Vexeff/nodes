import { signup } from '../../utils/auth_actions'

export default function LoginPage() {
  return (
    <main className='flex flex-col min-w-max min-h-screen'>

    <form className='flex flex-col place-items-center'>
        <div className='flex flex-row mt-10 space-x-5'>
            <label className='flex' htmlFor="email">Email:</label>
            <input className='flex dark:text-black' id="email" name="email" type="email" required />
            <label className='flex'  htmlFor="password">Password:</label>
            <input className='flex dark:text-black'  id="password" name="password" type="password" required />
        </div>
        <div className='flex flex-row mt-5 mb-10 space-x-5'>
            <label className='flex'  htmlFor="username">Username:</label>
            <input className='flex dark:text-black'  id="username" name="username" type="username" required />
        </div>
        <div className='flex flex-row space-x-5 '>
            <button className='p-2 border-neutral-800 border-2' formAction={signup}>Sign up</button>
        </div>
      
    </form>
    </main>
  )
}
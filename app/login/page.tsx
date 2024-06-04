import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <main className='flex flex-col min-w-max min-h-screen'>

    <form className='flex flex-col place-items-center'>
        <div className='flex flex-row my-10 space-x-5'>
            <label className='flex' htmlFor="email">Email:</label>
            <input className='flex' id="email" name="email" type="email" required />
            <label className='flex'  htmlFor="password">Password:</label>
            <input className='flex'  id="password" name="password" type="password" required />
        </div>
        <div className='flex flex-row space-x-5'>
            <button className='p-2 border-neutral-800 border-2' formAction={login}>Log in</button>
            <button className='p-2 border-neutral-800 border-2' formAction={signup}>Sign up</button>
        </div>
      
    </form>
    </main>
  )
}
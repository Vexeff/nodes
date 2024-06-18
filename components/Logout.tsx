'use client'

import { logout } from '@/utils/auth_actions'

export default function Logout(){
    return(
        <div className='flex justify-end w-full mr-5'>
            <button className='flex p-2 border-neutral-800 dark:border-neutral-500 border-2 hover:bg-black hover:duration-300 hover:text-white dark:hover:bg-white dark:text-white dark:hover:text-black self-end' onClick={() => logout()}>Log out</button>
        </div>
    )
}
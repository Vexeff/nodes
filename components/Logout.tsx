'use client'

import { logout } from '@/utils/auth_actions'

export default function Logout(){
    return(
        <div className='flex justify-end w-full mr-5'>
            <button className='flex p-2 border-neutral-800 border-2 self-end' onClick={() => logout()}>Log out</button>
        </div>
    )
}
'use client'

import { type User } from '@supabase/supabase-js'
import React from 'react'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState, useRef } from 'react'

/* const ProgressBarSkeleton = ({ bgcolor, completed }: { bgcolor: string, completed: number}) => {
    const supabase = createClient()
    
    return (
      <div className='h-20 w-full bg-[#e0e0de] rounded-[50px] m-50'>
        <div className={`h-full w-[${completed}%] bg-[${bgcolor}] rounded-[inherit] text-right`}>
          <span className='p-5 text-white font-bold'></span>
        </div>
      </div>
    );
} */

const ProgressBar = ( { current_xp, max_xp, completion_rate }: 
    {  current_xp: number, max_xp: number, completion_rate: number }) => {

    const fillerStyles = {
        height: '100%',
        width: `${completion_rate}%`,
        backgroundColor: '#00695c',
        borderRadius: 'inherit'
      }

    console.log('got new completion rate: ', completion_rate)
      
    return (
        <div className='h-20 bg-[#e0e0de] rounded-[50px] m-50 w-full'>
            <div style={fillerStyles} className='transition-all duration-[1750ms]'>
                <span className='p-5 text-white font-bold text-right'>
                    {current_xp}/{max_xp}
                </span>
            </div>
        </div>
    )
}

export default ProgressBar;
'use client'

import React from 'react'

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
        <div className='h-20 bg-[#e0e0de] rounded-[50px] m-50 w-full relative'>
            <div style={fillerStyles} className='transition-all duration-[1750ms] justify-center'>
            </div>
            <span className='w-full flex absolute top-2 bottom-0 p-5 text-black font-bold text-right justify-center'>
                {current_xp}/{max_xp}
            </span>
        </div>
    )
}

export default ProgressBar;
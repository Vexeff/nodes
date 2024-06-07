'use client'

import { type User } from '@supabase/supabase-js'
import ProgressBar from './Progressbar'
import TodoList from './TodoList'
import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'




const Dashboard = ( { user } : { user: User | null }) => {
    const supabase = createClient()
    
    const [loading, setLoading] = useState(true)
    const [userXP, setUserXP] = useState(0)
    const [userTotalXP, setUserTotalXP] = useState(0)
    const [userLevel, setUserLevel] = useState(1)
    const [maxLevelXP, setMaxLevelXP] = useState(100)
    const [userCompletionRate, setUserCompletionRate] = useState(0)
    
    async function levelUP( delta_xp: number , new_total_xp: number){
        console.log('leveling up...')
        try {
            const { data } = await supabase
                .from('user_xps')
                .update({ level: userLevel+1, xp: delta_xp, total_xp: new_total_xp })
                .eq('user_id', user!.id)
                .throwOnError()
    
            } catch (error) {
                console.log('error', error)
        }
        getLevelMaxXP(userLevel + 1)     
        setUserLevel(userLevel + 1)
        setUserXP(delta_xp)
    }

    async function add_xp(newXP: number, new_total_xp: number) {
        try {
            const { data } = await supabase
                .from('user_xps')
                .update({ xp: newXP, total_xp: new_total_xp })
                .eq('user_id', user!.id)
                .throwOnError()
            
            } catch (error) {
                console.log('error', error)
        } 
        setUserXP(newXP)
    }

    async function handle_xp(added_xp: number) {
        const newTotalXP = userTotalXP + added_xp
        let newXP = userXP + added_xp 
        // do everything here
        // 1. check if level up is necessary
        let delta_xp = maxLevelXP - userXP
        if (added_xp >= delta_xp){
            levelUP(added_xp - delta_xp, newTotalXP)
        } else{
            add_xp(newXP, newTotalXP)
        }
        setUserTotalXP(newTotalXP)
    }
    
    async function getLevelMaxXP (level: number) {
        const { data, error } = await supabase
            .from('levels')
            .select('max_xp')
            .eq('level', level)
            .single()

        if (error){
            console.log('error', error)
        } else{
            console.log('getting max level xp: ', data)
            setMaxLevelXP(data.max_xp)
        }
    }


    async function getUserProgress () {
        const { data, error } = await supabase
            .from('user_xps')
            .select('xp, level, total_xp')
            .single()

        if (error){
            console.log('error', error)
        } else{
            setUserXP(data.xp)
            setUserLevel(data.level)
            setUserTotalXP(data.total_xp)
            getLevelMaxXP(data.level)
        }
    }
    

    useEffect(() => {
        if (loading && supabase){
            getUserProgress()
            setLoading(!loading)
        }
      
    }, [supabase, loading])

    useEffect(() => {
        if (!loading){
            setUserCompletionRate(Math.round(100*userXP/maxLevelXP))
        }
    }, [userXP, maxLevelXP])

    
    return (
        <div>
            <div className='flex flex-col min-w-full justify-content-center pb-10'>
                <h1 className='flex justify-center mb-5'>
                    Level {userLevel}:
                </h1>
                <div className='flex justify-left px-5'>
                {!loading && <ProgressBar current_xp={userXP} max_xp={maxLevelXP} completion_rate={userCompletionRate}/>}
                </div>
            </div>
      
      <div className='flex flex-col min-w-full justify-around md:flex-row space-y-20 md:space-y-0'> 
        <div className='flex flex-col'>
          <p className='flex place-content-center'>
            Your to-do list:
          </p>
          <div className='flex place-content-center'>
            <TodoList user={user} type={'incomplete'} xp_handler={handle_xp} />
          </div>
        </div>

        <div className='flex flex-col'>
          <p className='flex place-content-center'>
            Your completed to-dos:
          </p>
          <div className='flex place-content-center'>
            <TodoList user={user} type={'complete'} xp_handler={handle_xp} />
          </div>
        </div>
      </div>
        </div>
    )
} 

export default Dashboard;
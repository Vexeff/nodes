'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import {  createClient } from '@/utils/supabase/server'
import { checkUserExists } from './supabase/checkUserExists'

export async function logout(){
  console.log('in log out')
  const supabase = createClient()
  
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log('error: ', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const userExists = await checkUserExists(data.email)

  if (!userExists){
    console.log('new user')
    revalidatePath('/', 'layout')
    redirect('/signup')
  }

  // sign user in 
  const { error } = await supabase.auth.signInWithPassword(data)

  
  if (error) {
    console.log('error: ', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        username: formData.get('username') as string
      },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log('error: ', error)
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/confirm-signup')
}
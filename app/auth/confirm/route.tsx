import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'
import { NextURL } from 'next/dist/server/web/next-url'

export async function GET(request: NextRequest) {
  
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  let redirect_to: string | NextURL = searchParams.get('redirect_to')!

  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      return NextResponse.redirect(redirect_to)
    }
  }

  // return the user to an error page with some instructions
  redirect_to = request.nextUrl.clone()
  redirect_to.searchParams.delete('token_hash')
  redirect_to.searchParams.delete('type')
  redirect_to.searchParams.delete('redirect_to')
  redirect_to.pathname = '/error'
  return NextResponse.redirect(redirect_to)
}
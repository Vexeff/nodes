import { createAdminClient } from '@/utils/supabase/server'

export async function checkUserExists(email: string) {
    const supabaseAdmin = createAdminClient()

    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 10000
    })

    // catch errors
    if (error) {
      console.error('Error checking if user exists:', error)
      return false
    }

    
    let users = data.users.map((user) => user.email)

    if (users.length >= 1000){
      console.log('Too many users. This needs to be fixed!')
      return false
    }

    return (users.includes(email))

}
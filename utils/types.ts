import { User } from '@supabase/supabase-js';

export type userData = {
    user: User 
}

export type userScore = {
    username: string | any, 
    total_xp: number
}

import { User } from '@supabase/supabase-js';

export type userData = {
    user: User 
}

export type userScore = {
    username: string, 
    total_xp: number
}

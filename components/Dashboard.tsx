import { userData } from '@/utils/types'
import TodoList from './TodoList';
import { SupabaseClient } from '@supabase/supabase-js';


const Dashboard = async ( supabase  : SupabaseClient) => {
    const { data, error } = await supabase.auth.getUser()
    
    return (
        <div>
            This is your id {data.user!.id}
            {/* <TodoList user_data={ data } /> */}
        </div>
    )
} 

export default Dashboard;
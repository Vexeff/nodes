'use client'

import { Database } from '@/utils/supabase/schema'
import { use, useEffect, useState } from 'react'
import { type User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'


type Todos = Database['public']['Tables']['todos']['Row']

const TodoList = ( { user, type, xp_handler } : { user: User | null, type: string, xp_handler: (new_xp: number)=>{} }) => {
    const supabase = createClient()
    const completed = type === 'complete' ? true : false

    const [todos, setTodos] = useState<Todos[]>([])
    const [newTaskText, setNewTaskText] = useState('')
    const [errorText, setErrorText] = useState('')

    const updateTodos = async () => {
        const { data: todos, error } = await supabase
            .from('todos')
            .select('*')
            .eq('is_complete', completed)
            .order('task_id', { ascending: true })

        if (error){
            console.log('error', error)
        } else{
            setTodos(todos)
        }
    }

    useEffect(() => {
        if (supabase){
            updateTodos()
        }
        
    }, [todos])

    const addTodo = async (taskText: string, xp_pts: number = 100) => {
        let task = taskText.trim()
        if (task.length) {
        const { data: todo, error } = await supabase
            .from('todos')
            .insert({ task, user_id: user?.id, xp_pts })
            .select()
            .single()

        if (error) {
            setErrorText(error.message)
        } else {
            setTodos([...todos, todo])
            setNewTaskText('')
        }
        }
    }

    const deleteTodo = async (id: number) => {
        try {
        await supabase.from('todos').delete().eq('task_id', id).throwOnError()
        setTodos(todos.filter((x) => x.task_id != id))
        } catch (error) {
        console.log('error', error)
        }
    }

    return (
        <div className="max-w-fit grid-cols-2">
        {!completed && <form
            onSubmit={(e) => {
            e.preventDefault()
            addTodo(newTaskText)
            }}
            className="flex gap-2 my-2"
        >
            <input
            className="rounded w-full p-2 dark:text-black"
            type="text"
            placeholder="go to the gym"
            value={newTaskText}
            onChange={(e) => {
                setErrorText('')
                setNewTaskText(e.target.value)
            }}
            />
            <button className="btn-black flex p-2 border-neutral-800 border-2 hover:bg-black hover:duration-300 hover:text-white dark:hover:bg-white dark:text-white dark:hover:text-black" type="submit">
                Add
            </button>
        </form>}
        {!!errorText && <Alert text={errorText} />}
        <div className="bg-white shadow overflow-hidden rounded-md min-w-80 gap-2 my-2">
            <ul>
            {todos.map((todo) => (
                <Todo key={todo.task_id} todo={todo} onDelete={() => deleteTodo(todo.task_id)} xp_handler={xp_handler} />
            ))}
            </ul>
        </div>
        </div>
    )
}

export default TodoList;

const Todo = ({ todo, onDelete, xp_handler }: { todo: Todos; onDelete: () => void, xp_handler: (new_xp: number) => void }) => {
    const supabase = createClient()

    const [isCompleted, setIsCompleted] = useState(todo.is_complete)

    const toggle = async () => {
        try {
        const { data } = await supabase
            .from('todos')
            .update({ is_complete: !isCompleted })
            .eq('task_id', todo.task_id)
            .throwOnError()
            .select()
            .single()

        if (!isCompleted){
            xp_handler(todo.xp_pts)
        }
       
        setIsCompleted(!isCompleted)
  
        } catch (error) {
        console.log('error', error)
        }
    }


    return (
        <li className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out border-t-gray-200 border-t-2">
        <div className="flex flex-row px-4 py-4 sm:px-6 min-w-0 gap-2 my-2 max-w-80">
            <div className="flex flex-row items-center w-[80%]">
                <div className="text-sm leading-5 font-medium truncate w-[70%] dark:text-black">
                    {todo.task}
                </div>
                <div className="text-sm leading-5 font-mono truncate w-[30%] text-green-900">
                    {todo.xp_pts}xp
                </div>
                
            </div>
            <div className='min-w-[20%]'>
            <input
                className="cursor-pointer"
                onChange={(e) => toggle()}
                type="checkbox"
                checked={isCompleted ? true : false}
            />
          
            <button
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onDelete()
            }}
            className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
                    <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    />
                </svg>
            </button>
            </div>
        </div>
        </li>
    )
}

const Alert = ({ text }: { text: string }) => (
    <div className="rounded-md bg-red-100 p-4 my-3">
        <div className="text-sm leading-5 text-red-700">{text}</div>
    </div>
)
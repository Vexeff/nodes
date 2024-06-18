'use client'

import { Database } from '@/utils/supabase/schema'
import { useEffect, useState } from 'react'
import { type User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'


type Todos = Database['public']['Tables']['todos']['Row']

const TodoList = ( { user, type, xp_handler } : { user: User | null, type: string, xp_handler: (new_xp: number)=>{} }) => {
    const supabase = createClient()
    const completed = type === 'complete' ? true : false

    const [todos, setTodos] = useState<Todos[]>([])
    const [newTaskText, setNewTaskText] = useState('')
    const [errorText, setErrorText] = useState('')
    const router = useRouter()


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

    const optionsMenu = async(todo: Todos) => {
        // for now, just add to google calendar
        console.log('options menu clicked with todo: ', todo)
        
       /*  router.push(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${todo.task}&dates=${todo.inserted_at}`) */
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
            <button className="btn-black flex p-2 border-neutral-800 dark:border-neutral-500 border-2 hover:bg-black hover:duration-300 hover:text-white dark:hover:bg-white dark:text-white dark:hover:text-black" type="submit">
                Add
            </button>
        </form>}
        {!!errorText && <Alert text={errorText} />}
        <div className="bg-white shadow overflow-visible rounded-md min-w-80 gap-2 my-2">
            <ul>
            {todos.map((todo) => (
                <Todo key={todo.task_id} todo={todo} onDelete={() => deleteTodo(todo.task_id)} onOptions={() => optionsMenu(todo)} xp_handler={xp_handler} />
            ))}
            </ul>
        </div>
        </div>
    )
}

export default TodoList;

const Todo = ({ todo, onDelete, onOptions, xp_handler }: { todo: Todos; onDelete: () => void, onOptions: () => void, xp_handler: (new_xp: number) => void }) => {
    const supabase = createClient()

    const [isCompleted, setIsCompleted] = useState(todo.is_complete)
    const [showOpts, setShowOpts] = useState(false)

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
        <div className="flex flex-row flex-none px-4 py-4 sm:px-6 min-w-0 gap-2 my-2" onMouseLeave={() => setShowOpts(false)}>
            <div className="flex flex-row items-center min-w-[70%] space-x-2">
                <div className="text-sm leading-5 font-medium line-clamp-1 w-[70%] dark:text-black overflow-hidden">
                    {todo.task}
                </div>
                <div className="text-sm leading-5 font-mono line-clamp-1 w-[30%] text-green-900">
                    {todo.xp_pts}xp
                </div>
                
            </div>
            <div className='min-w-[30%] flex flex-row justify-end'>
                <input
                    className="flex self-baseline cursor-pointer"
                    onChange={() => toggle()}
                    type="checkbox"
                    checked={isCompleted ? true : false}
                />
            
                <button
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDelete()
                }}
                className="flex self-baseline w-4 h-4 ml-2 border-2 hover:border-black rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
                            <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            />
                    </svg>
                </button>

                <div className='relative'>

               
                <button
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setShowOpts(!showOpts)
                }}
                className='flex overflow-visible self-basline w-4 h-4 ml-2 border-2 hover:border-black rounded justify-center'>
                    <svg viewBox="0 0 24 24" id="three-dots" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_iconCarrier"> <g id="_20x20_three-dots--grey" data-name="20x20/three-dots--grey" transform="translate(24) rotate(90)">
                        <rect id="Rectangle" width="24" height="24" fill="none"></rect> 
                        <circle id="Oval" cx="1" cy="1" r="1" transform="translate(5 11)" stroke="#000000" strokeMiterlimit="10" strokeWidth="0.5"></circle>
                        <circle id="Oval-2" data-name="Oval" cx="1" cy="1" r="1" transform="translate(11 11)" stroke="#000000" strokeMiterlimit="10" strokeWidth="0.5"></circle> 
                        <circle id="Oval-3" data-name="Oval" cx="1" cy="1" r="1" transform="translate(17 11)" stroke="#000000" strokeMiterlimit="10" strokeWidth="0.5"></circle> </g> </g>
                    </svg>
                </button>

                {showOpts && <ul className='absolute z-10 m-0 text-left top-5 -right-2.5 sm:-right-4 md:left-10 md:-top-6 w-36 text-sm bg-[#D6DBDC] dark:bg-black'>
                    <li className='p-0.5 border-b-0 border-neutral-800 dark:border-neutral-500 border-2 hover:bg-black hover:duration-300 hover:text-white dark:hover:bg-white dark:text-white dark:hover:text-black'>
                        <button onClick={() => console.log('add to calendar clicked')}>
                            Add to Calendar
                        </button>
                    </li>
                    <li className='p-0.5 border-neutral-800 dark:border-neutral-500 border-2 hover:bg-black hover:duration-300 hover:text-white dark:hover:bg-white dark:text-white dark:hover:text-black'>
                        <button onClick={() => console.log('Option 2 clicked')}>
                            Option 2
                        </button>
                    </li>
                </ul>}
               
                </div>
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
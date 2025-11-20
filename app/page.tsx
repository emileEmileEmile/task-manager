import { supabase } from '@/lib/supabase'
import AddTaskForm from './components/AddTaskForm'
import TaskItem from './components/TaskItem'

export default async function Home() {
  // Fetch tasks from Supabase
  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
      
      {/* Add Task Form */}
      <AddTaskForm />
      
      {/* Tasks List */}
      <div className="space-y-3">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            No tasks yet. Add one above! 👆
          </p>
        )}
      </div>
    </main>
  )
}
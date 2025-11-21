'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Task = {
  id: string
  title: string
  is_complete: boolean
}

export default function TaskItem({ task }: { task: Task }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function toggleComplete() {
    setLoading(true)
    
    const { error } = await supabase
      .from('tasks')
      .update({ is_complete: !task.is_complete })
      .eq('id', task.id)
    
    if (error) {
      alert('Error updating task: ' + error.message)
    } else {
      router.refresh()
    }
    
    setLoading(false)
  }

  async function deleteTask() {
    if (!confirm('Are you sure you want to delete this task?')) return
    
    setLoading(true)
    
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', task.id)
    
    if (error) {
      alert('Error deleting task: ' + error.message)
    } else {
      router.refresh()
    }
    
    setLoading(false)
  }

  return (
    <div className="border p-4 rounded flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className={`font-medium ${task.is_complete ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </p>
        <p className="text-sm text-gray-500">
          {task.is_complete ? '✅ Complete' : '⏳ Pending'}
        </p>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={toggleComplete}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 text-sm"
        >
          {task.is_complete ? 'Undo' : 'Complete'}
        </button>
        
        <button
          onClick={deleteTask}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
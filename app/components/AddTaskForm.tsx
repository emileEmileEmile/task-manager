'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
//import { useRouter } from 'next/navigation'

export default function AddTaskForm() {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  //const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!title.trim()) return // Don't submit empty tasks
    
    setLoading(true)
    
    // Insert new task into Supabase
    const { error } = await supabase
      .from('tasks')
      .insert({ title: title.trim() })
    
    if (error) {
      alert('Error creating task: ' + error.message)
    } else {
      setTitle('') // Clear the input
      //router.refresh() // Refresh the page to show new task
      window.location.reload()
    }
    
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}
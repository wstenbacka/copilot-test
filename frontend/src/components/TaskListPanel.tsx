import { useState } from 'react'
import { toast } from 'react-toastify'
import TaskItem from './TaskItem'
import { taskListAPI, taskAPI } from '../utils/api'

export default function TaskListPanel({ list, onRefresh }: any) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(list.name)

  const handleSaveEdit = () => {
    if (editName.trim()) {
      taskListAPI.update(list.id, { name: editName, description: list.description })
      setIsEditing(false)
      onRefresh()
    }
  }

  const handleDeleteList = () => {
    if (window.confirm('Delete this list?')) {
      taskListAPI.delete(list.id)
      onRefresh()
    }
  }

  const handleTaskUpdate = async (taskId: number, action: string) => {
    try {
      if (action === 'complete') await taskAPI.markComplete(taskId)
      else if (action === 'delete') {
        if (window.confirm('Delete task?')) await taskAPI.softDelete(taskId)
        else return
      }
      onRefresh()
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      <div style={{ padding: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isEditing ? (
          <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} onBlur={handleSaveEdit} autoFocus style={{ color: 'white', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', padding: '0.5rem', borderRadius: '0.375rem' }} />
        ) : (
          <h3 onClick={() => setIsEditing(true)} style={{ cursor: 'pointer', margin: 0 }}>{list.name}</h3>
        )}
        <button onClick={handleDeleteList} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>🗑️</button>
      </div>
      <div style={{ padding: '1rem' }}>
        {list.active_tasks.length === 0 && list.completed_tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          <>
            {list.active_tasks.length > 0 && (
              <>
                <h4>Active Tasks</h4>
                {list.active_tasks.map((task: any) => (
                  <TaskItem key={task.id} task={task} onComplete={() => handleTaskUpdate(task.id, 'complete')} onDelete={() => handleTaskUpdate(task.id, 'delete')} />
                ))}
              </>
            )}
            {list.completed_tasks.length > 0 && (
              <>
                <h4>Completed Tasks</h4>
                {list.completed_tasks.map((task: any) => (
                  <TaskItem key={task.id} task={task} isCompleted onComplete={() => handleTaskUpdate(task.id, 'complete')} onDelete={() => handleTaskUpdate(task.id, 'delete')} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import TaskListPanel from '../components/TaskListPanel'
import { taskListAPI } from '../utils/api'
import { removeToken } from '../utils/auth'

export default function Home({ isDarkTheme, setIsDarkTheme }: any) {
  const navigate = useNavigate()
  const [taskLists, setTaskLists] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTaskLists()
  }, [])

  const fetchTaskLists = async () => {
    try {
      const response = await taskListAPI.getAll()
      setTaskLists(response.data)
    } catch (error) {
      toast.error('Failed to load task lists')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  const handleCreateList = async (name: string) => {
    try {
      await taskListAPI.create({ name, description: '' })
      toast.success('List created!')
      fetchTaskLists()
    } catch (error) {
      toast.error('Failed to create list')
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header onLogout={handleLogout} isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      <main style={{ flex: 1, padding: '1rem' }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : taskLists.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <p>No task lists yet. Create one to get started!</p>
            <button onClick={() => handleCreateList('My First List')}>Create First List</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {taskLists.map((list: any) => (
              <TaskListPanel key={list.id} list={list} onRefresh={fetchTaskLists} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

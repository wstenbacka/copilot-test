export default function TaskItem({ task, onComplete, onDelete, isCompleted }: any) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.375rem', marginBottom: '0.5rem', opacity: isCompleted ? 0.7 : 1 }}>
      <div>
        <h5 style={{ margin: 0, textDecoration: isCompleted ? 'line-through' : 'none' }}>{task.title}</h5>
        {task.description && <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#6b7280' }}>{task.description}</p>}
        {task.deadline && <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>📅 {new Date(task.deadline).toLocaleString()}</p>}
      </div>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        <button onClick={onComplete} style={{ background: 'transparent', border: '1px solid #d1d5db', padding: '0.375rem 0.5rem', cursor: 'pointer' }}>{isCompleted ? '↩️' : '✓'}</button>
        <button onClick={onDelete} style={{ background: 'transparent', border: '1px solid #d1d5db', padding: '0.375rem 0.5rem', cursor: 'pointer' }}>🗑️</button>
      </div>
    </div>
  )
}

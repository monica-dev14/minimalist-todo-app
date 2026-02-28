import React, { useState } from 'react';

export const App = () => {
  const [todo, setTodo] = useState('');
  const [todolist, setTodolist] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  const addTodo = () => {
    if (todo.trim() === '') return;
    setTodolist([...todolist, { id: Date.now(), text: todo, complete: false }]);
    setTodo('');
    setActiveTab('pending');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  const toggleComplete = (id) => {
    setTodolist(todolist.map((item) =>
      item.id === id ? { ...item, complete: !item.complete } : item
    ));
  };

  const deleteTodo = (id) => {
    setTodolist(todolist.filter((item) => item.id !== id));
  };

  const pendingTasks = todolist.filter(t => !t.complete);
  const completedTasks = todolist.filter(t => t.complete);

  return (
    /* MAIN CONTAINER: Screen-ku ulla nirkum */
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'flex-start',
      overflow: 'hidden' // Double check kaga
    }}>
      
      <div className="App" style={{ 
        width: '100%',
        maxWidth: '500px', 
        padding: '20px', 
        fontFamily: 'Arial',
        height: '90vh', // Konjam gap kaga
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h1 style={{ textAlign: 'center' }}>my-do-list</h1>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
          <button onClick={() => setActiveTab('add')} style={tabStyle(activeTab === 'add')}>Add Task</button>
          <button onClick={() => setActiveTab('pending')} style={tabStyle(activeTab === 'pending')}>Pending ({pendingTasks.length})</button>
          <button onClick={() => setActiveTab('completed')} style={tabStyle(activeTab === 'completed')}>Completed ({completedTasks.length})</button>
        </div>

        {/* List Content: Inga mattum dhaan scroll varum */}
        <div className="content-area" style={{ 
          flex: 1, 
          overflowY: 'auto', // List-ku mattum scroll
          padding: '15px', 
          background: '#f9f9f9', 
          borderRadius: '10px',
          boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)'
        }}>
          
          {activeTab === 'add' && (
            <div style={{ textAlign: 'center', paddingTop: '50px' }}>
              <h2>Create New Task</h2>
              <input 
                type='text' 
                placeholder='What needs to be done?'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ padding: '12px', width: '70%', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <button onClick={addTodo} style={{ padding: '12px 20px', marginLeft: '10px', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add</button>
            </div>
          )}

          {activeTab === 'pending' && (
            <div>
              <h2 style={{ textAlign: 'center' }}>Tasks to Finish</h2>
              {pendingTasks.length === 0 ? <p style={{ textAlign: 'center' }}>No pending tasks!</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {pendingTasks.map((item, index) => (
                    <li key={item.id} style={listItemStyle}>
                      <span onClick={() => toggleComplete(item.id)} style={{ cursor: 'pointer', flex: 1 }}>
                        <strong>{index + 1}.</strong> {item.text}
                      </span>
                      <button onClick={() => deleteTodo(item.id)} style={deleteBtnStyle}>Delete</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === 'completed' && (
            <div>
              <h2 style={{ textAlign: 'center' }}>Finished Tasks</h2>
              {completedTasks.length === 0 ? <p style={{ textAlign: 'center' }}>Nothing completed yet.</p> : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {completedTasks.map((item, index) => (
                    <li key={item.id} style={{ ...listItemStyle, opacity: 0.7 }}>
                      <span onClick={() => toggleComplete(item.id)} style={{ textDecoration: 'line-through', cursor: 'pointer', flex: 1 }}>
                        <strong>{index + 1}.</strong> {item.text}
                      </span>
                      <button onClick={() => deleteTodo(item.id)} style={deleteBtnStyle}>Delete</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Styles
const tabStyle = (isActive) => ({
  background: 'none',
  border: 'none',
  padding: '10px',
  cursor: 'pointer',
  fontWeight: isActive ? 'bold' : 'normal',
  color: isActive ? '#4a90e2' : '#666',
  borderBottom: isActive ? '3px solid #4a90e2' : 'none',
  outline: 'none'
});

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  background: 'white',
  marginBottom: '10px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  gap: '20px'
};

const deleteBtnStyle = {
  background: '#ff5e5e',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default App;
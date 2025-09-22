import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './components/Todo';

function App() {
  const [todos, setTodo] = useState([]);
  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodo(newTodos);
  }
  return (
    <>
      <div>
        <img src={reactLogo} className="App-logo" alt="logo" />
        <Todo ></Todo>
        {todos.map((todo, dx) => {
          <Todo key={idx} title={todo.title} description={todo.description} onDelete={handleDelete}></Todo>
        })}
      </div>

    </>
  )
}

export default App

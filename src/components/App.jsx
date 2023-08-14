import '../reset.css';
import '../App.css';
import { useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [todoId, setTodoId] = useLocalStorage('todoId', 1);

  return (
    <TodosContext.Provider value={{ todos, setTodos, todoId, setTodoId }}>
      <div className="todo-app-container">
        <div className="todo-app">
          <h2>Todo App</h2>
          <TodoForm />

          <SwitchTransition mode="out-in">
            <CSSTransition
              key={todos.length > 0}
              timeout={300}
              classNames="slide-vertical"
              unmountOnExit
            >
              {todos.length > 0 ? <TodoList /> : <NoTodos />}
            </CSSTransition>
          </SwitchTransition>

        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;

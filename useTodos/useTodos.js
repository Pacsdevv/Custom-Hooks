import { useReducer, useEffect } from 'react';
import { todoReducer } from './todoReducer';

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = (initialState = []) => {
  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    dispatch({
      type: 'Add Todo',
      payload: todo,
    });
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: 'Remove Todo',
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: 'Toggle Todo',
      payload: id,
    });
  };

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodosCount: todos.filter((todo) => !todo.done).length,
  };
};

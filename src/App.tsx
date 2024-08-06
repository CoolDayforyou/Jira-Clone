import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchTodos, selectAllTodos } from "./features/todos/todosSlice";
import { fetchUsers } from "./features/users/usersSlice";
import "./styles/main.scss";
import TodoList from "./features/todos/TodoList";
import TodoBoard from "./features/todos/TodoBoard";

function App() {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(selectAllTodos);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container">
      <h2 className="title">Ticket list</h2>
      <TodoList todos={todos} />
      <h2 className="title">Ticket board</h2>
      <TodoBoard todos={todos} />
    </div>
  );
}

export default App;

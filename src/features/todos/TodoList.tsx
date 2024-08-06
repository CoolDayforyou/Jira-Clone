import React, { FC } from "react";
import { todoSort } from "../../app/hooks";
import TodoTicket from "./TodoTicket";
import "./style.scss";
import { IExtendedTodo } from "../../app/types";

const TodoList: FC<{ todos: IExtendedTodo[] }> = ({ todos }) => {
  const sortedTodos = todos.sort(todoSort);

  return (
    <section className="todo-list">
      {sortedTodos.map((todo) => (
        <TodoTicket key={todo.id} todo={todo} listOrBoard="list" />
      ))}
    </section>
  );
};

export default TodoList;

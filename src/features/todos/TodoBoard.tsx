import React, { FC } from "react";
import { IExtendedTodo, TodoStatusEnum } from "../../app/types";
import "./style.scss";
import TodoTicket from "./TodoTicket";

const TodoBoard: FC<{ todos: IExtendedTodo[] }> = ({ todos }) => {
  const { TO_DO, IN_PROGRESS, DONE } = TodoStatusEnum;

  const todoStatus = [TO_DO, IN_PROGRESS, DONE];

  return (
    <table className="todo-board">
      <thead>
        <tr>
          <th>
            <h2>{TO_DO}</h2>
          </th>
          <th>
            <h2>{IN_PROGRESS}</h2>
          </th>
          <th>
            <h2>{DONE}</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {todoStatus.map((status) => {
            const filteredTodos = todos.filter(
              (todo) => todo.progress === status,
            );

            return (
              <td key={status}>
                <div>
                  {filteredTodos.map((todo) => (
                    <TodoTicket key={todo.id} todo={todo} listOrBoard="board" />
                  ))}
                </div>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default TodoBoard;

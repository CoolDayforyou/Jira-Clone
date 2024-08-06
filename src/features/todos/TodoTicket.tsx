import React, { FC } from "react";
import { useAppDispatch } from "../../app/hooks";
import UserAvatar from "../users/UserAvatar";
import { toggleTodo, updateTodo } from "./todosSlice";
import "./style.scss";
import { IExtendedTodo, TodoStatusEnum } from "../../app/types";

const TodoTicket: FC<{
  todo: IExtendedTodo;
  listOrBoard: "list" | "board";
}> = ({ todo, listOrBoard }) => {
  const dispatch = useAppDispatch();

  if (!todo) {
    return (
      <div className="empty-ticket">
        <h2>This ticket doesn't exist :(</h2>
      </div>
    );
  }

  const handleTodoClick = async () => {
    dispatch(toggleTodo(todo.id));
    if (todo.progress === TodoStatusEnum.IN_PROGRESS) {
      await dispatch(updateTodo(todo.id));
    }
  };

  return (
    <div
      className={`todo-ticket  ${
        listOrBoard === "board" ? "board-ticket" : ""
      }`}
      style={{
        cursor: !todo.completed ? "pointer" : undefined,
      }}
      onClick={handleTodoClick}
    >
      <div className="user">
        <UserAvatar key={todo.userId} userId={todo.userId} />
      </div>
      <h3 className="todo-title">{todo.title}</h3>
      <h2>{listOrBoard === "list" ? todo.progress : ""}</h2>
    </div>
  );
};

export default TodoTicket;

import { EntityState } from "@reduxjs/toolkit";

export enum FetchStatusEnum {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}
export interface IFetchStatus {
  status: `${FetchStatusEnum}`;
  errorMessage: string;
}

export enum TodoStatusEnum {
  TO_DO = "To do",
  IN_PROGRESS = "In progress",
  DONE = "Done",
}

export type TodoStatusType = `${TodoStatusEnum}`;

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
export interface IExtendedTodo extends ITodo {
  progress: TodoStatusType;
}

export interface ITodoState extends EntityState<IExtendedTodo>, IFetchStatus {}

export interface IUser {
  id: number;
  name: string;
}

export interface IExtendedUser extends IUser {
  avatar_color: string;
}

export interface IUserState extends EntityState<IExtendedUser>, IFetchStatus {}

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { IExtendedTodo, TodoStatusEnum } from "./types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const todoSort = (a: IExtendedTodo, b: IExtendedTodo): number => {
  const order = {
    [TodoStatusEnum.TO_DO]: 0,
    [TodoStatusEnum.IN_PROGRESS]: 1,
    [TodoStatusEnum.DONE]: 2,
  };

  return order[a.progress] - order[b.progress];
};

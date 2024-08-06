import React, { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "./usersSlice";
import { EntityId } from "@reduxjs/toolkit";
import "./style.scss";

const UsersAvatar: FC<{ userId: EntityId }> = ({ userId }) => {
  const user = useAppSelector((state) => selectUserById(state, userId));

  const splitName = user?.name.split(" ");

  return (
    <div
      className="user-avatar"
      style={{ backgroundColor: user ? user.avatar_color : "#000" }}
    >
      <h3>{splitName ? splitName.map((name) => name.slice(0, 1)) : "NN"}</h3>
    </div>
  );
};

export default UsersAvatar;

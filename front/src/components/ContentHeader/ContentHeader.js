import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import style from "./ContentHeader.module.scss";
import logo from "../../images/groupomania.svg";

//This component is used to display user's firstName and lastName on posts and comments
//Also add a link to the user's profile of the content
export default function ContentHeader({ user, children }) {
  return (
    <header className={style.contentHeader}>
      <Link className={style.headerInfos} to={`/profile/${user.id}`}>
        <img
          src={user.imageUrl === "" ? logo : user.imageUrl}
          className={style.avatar}
          alt="Avatar"
        />
        <div>
          <h4 className={style.name}>{`${user.firstName} ${user.lastName}`}</h4>
        </div>
      </Link>
      {children}
    </header>
  );
}

import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ContentHeader from "../ContentHeader/ContentHeader";
import CommentEdit from "../CommentEdit/CommentEdit";
import style from "./Comment.module.scss";
import { getOneUser } from "../../services/users";

//This component is used to display a comment
export default function Comment({ comment }) {
  const [user, setUser] = useState();

  //Call user service to get comment's user
  const getUser = async () => {
    const currentUser = await getOneUser(comment.UserId);
    if (currentUser) {
      setUser(currentUser);
    }
  };

  //Called only one time
  useEffect(() => {
    getUser().catch(console.error);
  }, []);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className={style.comment}>
      <ContentHeader user={user}>
        <CommentEdit user={user} comment={comment} />
      </ContentHeader>
      <p className={style.text}>{comment.text}</p>
      <p className={style.date}>
        {new Date(comment.createdAt).toLocaleString()}
      </p>
    </div>
  );
}

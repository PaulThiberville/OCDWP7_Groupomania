import React, { useState, useEffect } from "react";
import { deleteComment } from "../../services/comments";
import style from "./CommentEdit.module.scss";
import Modal from "../Modal/Modal";
import EditCommentForm from "../EditCommentForm/EditCommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

//This component display edit and delete button on a comment if user has acces or if user is admin.
export default function CommentEdit({ user, comment, setComment }) {
  const [isMine, setIsMine] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();

  //Set isMine to true if user have access or is admin.
  useEffect(() => {
    if (user) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (user.id === localUser.userId || localUser.role === "admin")
        setIsMine(true);
    }
  }, [user]);

  //Ask service then redux to delete comment on delete button clicked
  const handleDelete = async () => {
    await deleteComment(comment.id).catch(console.error);
    dispatch({
      type: "home/deleteComment",
      payload: comment,
    });
    dispatch({
      type: "post/deleteComment",
      payload: comment.id,
    });
    dispatch({
      type: "comments/deleteComment",
      payload: comment.id,
    });
  };

  return (
    <div className={style.headerButtons}>
      {isMine === true && (
        <FontAwesomeIcon
          icon={faPen}
          onClick={() => setIsEditOpen(true)}
          className="hover--color-blue"
        />
      )}

      {isMine === true && (
        <Modal open={isEditOpen} onClose={() => setIsEditOpen(false)}>
          <EditCommentForm
            onClose={() => setIsEditOpen(false)}
            comment={comment}
            currentText={comment.text}
            setComment={setComment}
          />
        </Modal>
      )}

      {isMine === true && (
        <FontAwesomeIcon
          icon={faTrash}
          className="hover--color-red"
          onClick={async () => await handleDelete()}
        />
      )}
    </div>
  );
}

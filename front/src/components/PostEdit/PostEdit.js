import React, { useState, useEffect } from "react";
import { deletePost } from "../../services/posts";
import style from "./PostEdit.module.scss";
import Modal from "../Modal/Modal";
import EditPostForm from "../EditPostForm/EditPostForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//This component display edit and delete button on a post if user has acces or if user is admin.
export default function PostEdit({ user, post, setPost }) {
  const [isMine, setIsMine] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Set isMine to true if user have access or is admin.
  useEffect(() => {
    if (user) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (user.id === localUser.userId || localUser.role === "admin")
        setIsMine(true);
    }
  }, [user]);

  //Ask service then redux to delete post on delete button clicked
  const handleDelete = async () => {
    var page = window.location.pathname.split("/")[1];
    if (page === "post") navigate("/");
    await deletePost(post.id).catch(console.error);
    dispatch({
      type: "home/deletePost",
      payload: post.id,
    });
    dispatch({
      type: "profile/deletePost",
      payload: post.id,
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
          <EditPostForm
            onClose={() => setIsEditOpen(false)}
            postId={post.id}
            currentText={post.text}
            setPost={setPost}
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

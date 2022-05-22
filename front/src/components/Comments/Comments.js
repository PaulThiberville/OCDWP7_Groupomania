import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPostComments } from "../../services/comments";
import Comment from "../Comment/Comment";
import style from "./Comments.module.scss";

//This component is used to display comments from an array
export default function Comments({ postId }) {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  //Call services to get some new comments from api then ask to redux to add them to his state
  const getComments = async () => {
    const newComments = await getAllPostComments(
      postId,
      comments.offset,
      comments.date
    );
    if (newComments) {
      dispatch({
        type: "comments/addComments",
        payload: newComments,
      });
    }
  };

  //Act like GetComments() but for initialisation
  const setComments = async () => {
    const newComments = await getAllPostComments(postId, 0, Date.now());
    if (newComments) {
      dispatch({
        type: "comments/setComments",
        payload: newComments,
      });
    }
  };

  //Used to clean redux state
  const clearComments = () => {
    dispatch({
      type: "comments/clearComments",
    });
  };

  //Called one time
  useEffect(() => {
    setComments().catch(console.error);
    return clearComments();
  }, []);

  if (!comments) return null;

  return (
    <div className={style.comments}>
      {
        //Map the comments array
        comments.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      }
      {comments.comments.length < parseInt(comments.total) && (
        <button
          className={style.loadMore}
          onClick={async () => {
            await getComments();
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}

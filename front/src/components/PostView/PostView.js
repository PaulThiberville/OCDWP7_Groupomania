import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import Post from "../Post/Post";
import Comments from "../Comments/Comments";

import { getOnePost } from "../../services/posts";

import style from "./PostView.module.scss";
import CreateComment from "../CreateComment/CreateComment";
import { useDispatch, useSelector } from "react-redux";

//This component is used to display a post with comments and comment creation
export default function PostView() {
  const params = useParams();
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  //Call services to get post from api then ask to redux to add it to state
  const getPost = async () => {
    const currentPost = await getOnePost(params.id);
    if (currentPost) {
      dispatch({
        type: "post/setPost",
        payload: currentPost,
      });
    }
  };

  //Used to clean redux state
  const clearPost = () => {
    dispatch({
      type: "post/clearPost",
    });
  };

  //Called one time
  useEffect(() => {
    getPost().catch(console.error);
    return clearPost;
  }, []);

  if (post === null) return null;

  return (
    <div className={style.postView}>
      <Post post={post} />
      <CreateComment postId={params.id} />
      <Comments postId={params.id} />
    </div>
  );
}

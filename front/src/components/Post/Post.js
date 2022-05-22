import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOneUser } from "../../services/users";
import { likePost } from "../../services/posts";

import ContentHeader from "../ContentHeader/ContentHeader";
import PostEdit from "../PostEdit/PostEdit";
import { Link } from "react-router-dom";

import style from "./Post.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

//This component is used to display a post
export default function Post({ post }) {
  const [user, setUser] = useState();
  const [likeStatus, setLikeStatus] = useState();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.user);

  //Call user service to get post's user
  const getUser = async () => {
    const currentUser = await getOneUser(post.UserId);
    if (currentUser) {
      setUser(currentUser);
    }
  };

  //Called only one time
  useEffect(() => {
    getUser().catch(console.error);
  }, []);

  //Called on redux state change for this user profile
  useEffect(() => {
    if (profile) {
      if (profile.id === post.UserId) getUser().catch(console.error);
    }
  }, [profile]);

  //Called everytime the component is rendered
  useEffect(() => {
    if (post) getLikeStatus();
  });

  //Ask redux to set the like status everywhere we need
  const onLike = async () => {
    const newLikeStatus = likeStatus === true ? "0" : "1";
    const updatedPost = await likePost(post.id, newLikeStatus);
    dispatch({
      type: "home/likePost",
      payload: updatedPost,
    });
    dispatch({
      type: "post/likePost",
      payload: updatedPost,
    });
    dispatch({
      type: "profile/likePost",
      payload: updatedPost,
    });
  };

  //Check if this user like the post from usersLiked array
  const getLikeStatus = () => {
    const myUser = JSON.parse(localStorage.getItem("user"));
    let result = false;
    const usersLiked = JSON.parse(post.usersLiked);
    usersLiked.forEach((userId) => {
      if (userId === myUser.userId) result = true;
    });
    setLikeStatus(result);
  };

  if (!user) return null;

  return (
    <article className={style.post}>
      <ContentHeader user={user}>
        <PostEdit post={post} user={user} />
      </ContentHeader>

      <main className={style.main}>
        <Link to={`/post/${post.id}`} className={style.link}>
          <p className={style.mainText}>{post.text}</p>
          {post.imageUrl !== "" && (
            <img src={post.imageUrl} className={style.mainImage} />
          )}
        </Link>
      </main>

      <footer className={style.footer}>
        <div className={style.footerButtonsContainer}>
          <FontAwesomeIcon
            icon={faHeart}
            className={
              likeStatus === true ? "color--blue" : "hover--color-blue"
            }
            onClick={async () => await onLike()}
          />
          {post.likes}

          <Link to={`/post/${post.id}`}>
            <FontAwesomeIcon icon={faComment} className="hover--color-blue" />
          </Link>
          {post.Comments.length}
        </div>

        <p className={style.date}>
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </footer>
    </article>
  );
}

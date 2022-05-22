import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { getAllUserPosts } from "../../services/posts";

import style from "./ProfileView.module.scss";

import Profile from "../Profile/Profile";
import Posts from "../Posts/Posts";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";

//This component is used to display a profile and manage an array of posts
export default function ProfileView({ newPost }) {
  const params = useParams();
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  //Call services to get some posts from api then ask to redux to add it to state
  const getPosts = async () => {
    const newPosts = await getAllUserPosts(
      params.id,
      profile.offset,
      profile.date
    );
    if (newPosts) {
      dispatch({
        type: "profile/addPosts",
        payload: newPosts,
      });
    }
  };

  //Act like GetPosts() but for initialisation
  const setPosts = async () => {
    const newPosts = await getAllUserPosts(params.id, 0, Date.now());
    if (newPosts) {
      dispatch({
        type: "profile/setPosts",
        payload: newPosts,
      });
    }
  };

  //Used to clean redux state
  const clearPosts = () => {
    dispatch({
      type: "profile/clearPosts",
    });
  };

  //Called one time
  useEffect(() => {
    setPosts().catch(console.error);
    return clearPosts();
  }, []);

  return (
    <section className={style.profileView}>
      <Profile userId={params.id} />
      <Posts
        posts={profile.posts}
        onLoadMore={async () => await getPosts()}
        total={profile.total}
      />
    </section>
  );
}

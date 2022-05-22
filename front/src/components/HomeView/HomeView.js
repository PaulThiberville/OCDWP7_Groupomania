import React, { useState, useEffect, useRef, useCallback } from "react";
import style from "./HomeView.module.scss";
import { getAllPosts } from "../../services/posts.js";
import Loader from "../Loader/Loader";
import Posts from "../Posts/Posts";
import { useSelector, useDispatch } from "react-redux";

//This component is used to manage an array of all users posts
export default function HomeView() {
  const home = useSelector((state) => state.home);
  const dispatch = useDispatch();

  //Call services to get some new posts from api then ask to redux to add them to his state
  const getPosts = async () => {
    const newPosts = await getAllPosts(home.offset, home.date);
    if (newPosts) {
      dispatch({
        type: "home/addPosts",
        payload: newPosts,
      });
    }
  };

  //Act like GetPosts() but for initialisation
  const setPosts = async () => {
    const newPosts = await getAllPosts(0, Date.now());
    if (newPosts) {
      dispatch({
        type: "home/setPosts",
        payload: newPosts,
      });
    }
  };

  //Used to clean redux state
  const clearPosts = () => {
    dispatch({
      type: "home/clearPosts",
    });
  };

  //Called one time
  useEffect(() => {
    setPosts().catch(console.error);
    return clearPosts();
  }, []);

  if (!home) return null;

  return (
    <section className={style.home}>
      <Posts posts={home.posts} onLoadMore={getPosts} total={home.total} />
    </section>
  );
}

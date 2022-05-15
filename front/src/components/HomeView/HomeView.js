import React, {useState, useEffect, useRef, useCallback} from 'react'
import style from './HomeView.module.scss'
import {getAllPosts,} from '../../services/posts.js'
import Loader from '../Loader/Loader'
import Posts from '../Posts/Posts'
import { useSelector,useDispatch } from 'react-redux'

export default function HomeView() {
  const home = useSelector((state) => state.home)
    const dispatch = useDispatch()

    const getPosts = async ()=>{
      const newPosts = await getAllPosts(home.offset,home.date)
      if(newPosts){
        dispatch({
          type: "home/addPosts",
          payload: newPosts
        })
        
      }
    }

    const setPosts = async ()=>{
      const newPosts = await getAllPosts(0,Date.now())
      if(newPosts){
        dispatch({
          type: "home/setPosts",
          payload: newPosts
        })        
      }
    }

    const clearPosts = ()=>{
      dispatch({
        type: "home/clearPosts"
      })
    }
     
    useEffect(()=>{
      setPosts().catch(console.error)
      return clearPosts()
    },[])

  if(!home) return null

  return (
    <section className={style.home}> 
        <Posts posts={home.posts} onLoadMore={getPosts} total={home.total}/>
    </section>
  )
}



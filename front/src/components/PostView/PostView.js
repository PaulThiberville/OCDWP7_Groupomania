import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Post from '../Post/Post'
import Loader from '../Loader/Loader'
import Comments from '../Comments/Comments'

import { getOnePost, deletePost } from '../../services/posts'

import style from './PostView.module.scss'
import CreateComment from '../CreateComment/CreateComment'
import { useDispatch, useSelector } from 'react-redux'


export default function PostView() {
  const params = useParams()
  const post = useSelector(state => state.post)
  const dispatch = useDispatch()

  const getPost = async ()=>{
    const currentPost = await getOnePost(params.id)
    if(currentPost){
      dispatch({
        type:"post/setPost",
        payload: currentPost
      })
    }
  }

  const clearPost = ()=>{
    dispatch({
      type:"post/clearPost"
    })
  }

  useEffect(()=>{
    getPost().catch(console.error)
    return clearPost
  },[])

  if(post === null) return null

  return (
    <div className={style.postView}>
      <Post post={post} />
      <CreateComment postId={params.id} />
      <Comments postId={params.id} />
    </div>
  )
}

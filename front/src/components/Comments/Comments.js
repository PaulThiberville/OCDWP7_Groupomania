import React,{useState, useRef, useEffect} from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { getAllPostComments } from '../../services/comments'

import Comment from '../Comment/Comment'
import Loader from '../Loader/Loader'

import style from './Comments.module.scss'

export default function Comments({postId}) {
  const comments = useSelector((state) => state.comments)
  const dispatch = useDispatch()

  const getComments = async ()=>{
    const newComments = await getAllPostComments(postId,comments.offset,comments.date)
    if(newComments){
      dispatch({
        type: "comments/addComments",
        payload: newComments
      })
      
    }
  }

  const setComments = async ()=>{
    const newComments = await getAllPostComments(postId,0,Date.now())
    if(newComments){
      dispatch({
        type: "comments/setComments",
        payload: newComments
      })
      
    }
  }

  const clearComments = ()=>{
    dispatch({
      type: "comments/clearComments"
    })
  }
   
  useEffect(()=>{
    setComments().catch(console.error)
    return clearComments()
  },[])

  if(!comments)return null

  return (
    <div className={style.comments}>
      {comments.comments.map(comment=> <Comment key={comment.id} comment={comment} />)}
      {comments.comments.length < parseInt(comments.total) && <button className={style.loadMore} onClick={async()=>{ await getComments()}}>Load More</button> }
    </div>
  )
}

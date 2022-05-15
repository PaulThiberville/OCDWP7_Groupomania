import React, { useEffect, useState } from 'react'

import { getOneComment, deleteComment } from '../../services/comments'

import Loader from '../Loader/Loader'
import ContentHeader from '../ContentHeader/ContentHeader'
import CommentEdit from '../CommentEdit/CommentEdit'

import style from './Comment.module.scss'
import { getOneUser } from '../../services/users'

export default function Comment({comment}) {
  const [user, setUser] = useState()

    const getuser = async ()=>{
        const currentUser = await getOneUser(comment.UserId)
        if(currentUser){
            setUser(currentUser)
        }
    }

    useEffect(()=>{
        getuser().catch(console.error)
    },[])

  if(!user){
    return <Loader />
  }

  return (
    <div className={style.comment}>
      <ContentHeader user={user}>
        <CommentEdit user={user} comment={comment} />
      </ContentHeader>
      <p className={style.text}>{comment.text}</p>
      <p className={style.date}>{new Date(comment.createdAt).toLocaleString()}</p>
    </div>
  )
}

import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'

import { getAllUserPosts } from '../../services/posts'

import style from './ProfileView.module.scss'

import Profile from '../Profile/Profile'
import Posts from '../Posts/Posts'
import Loader from '../Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'

export default function ProfileView({newPost}) { 
    const params = useParams()        
    const profile = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const getPosts = async ()=>{
      const newPosts = await getAllUserPosts(params.id,profile.offset,profile.date)
      if(newPosts){
        dispatch({
          type: "profile/addPosts",
          payload: newPosts
        })
        
      }
    }

    const setPosts = async ()=>{
      const newPosts = await getAllUserPosts(params.id,0,Date.now())
      if(newPosts){
        dispatch({
          type: "profile/setPosts",
          payload: newPosts
        })        
      }
    }

    const clearPosts = ()=>{
      dispatch({
        type: "profile/clearPosts"
      })
    }
     
    useEffect(()=>{
      setPosts().catch(console.error)
      return clearPosts()
    },[])

    const onLoadMore = async ()=>{
      await getPosts()
    }

    return (
        <section className={style.profileView}> 
            <Profile userId={params.id} />
            <Posts posts={profile.posts} onLoadMore={onLoadMore} total={profile.total}/>
        </section>
    )
}

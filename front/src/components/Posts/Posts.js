import React, {useRef, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Post from'../Post/Post'

import style from './Posts.module.scss'

export default function Posts({posts, onLoadMore, total}) {

    return (
      <div className={style.posts}>
        {posts.map(post=> <Post post={post} key={post.id} />)}
        {posts.length < parseInt(total) && <button className={style.loadMore} onClick={async()=>{ await onLoadMore()}}>Load More</button> }
      </div>
    )
  }


 
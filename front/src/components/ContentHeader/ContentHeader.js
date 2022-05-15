import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import style from './ContentHeader.module.scss'
import logo from '../../images/groupomania.svg'


export default function ContentHeader({user, children}) {
    const [isMine, setIsMine] = useState(false)

    useEffect(()=>{
        if(user){
            const localUser = JSON.parse(localStorage.getItem("user"))
            if(user.id === localUser.userId) setIsMine(true) 
        }
    },[user])


  return (
    <header className={style.contentHeader}>
        <Link className={style.headerInfos} to={`/profile/${user.id}`}>
            <img src={user.imageUrl === ""? logo : user.imageUrl} className={style.avatar}/>
            <div>
            <h4 className={style.name}>{`${user.firstName} ${user.lastName}`}</h4>
            </div>
        </Link>
        {children}
    </header>
  )
}

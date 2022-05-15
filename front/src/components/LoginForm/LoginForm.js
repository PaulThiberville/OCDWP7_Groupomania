import React,{useRef} from 'react'
import {loginUser} from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import formStyle from '../../formStyle.module.scss'

export default function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async ({email,password})=>{ 
      const user = await loginUser(email,password)
      if(user){
        dispatch({
          type:"user/setUser",
          payload:user
        })
        navigate("/")
      }
    }

  return (
    <form className={formStyle.form} name='loginForm' onSubmit={handleSubmit(async data => await onSubmit(data))}>
      
      <div>
        <label>Email</label>
        <input 
          className={formStyle.input}
          required={true}
          type="email" 
          {...register("email")}
        />
      </div>
      
      <div>
        <label>Password</label>
        <input 
          className={formStyle.input}
          required={true}
          minLength={6} 
          maxLength={16} 
          type="password" 
          {...register("password")}
        />
      </div>

      <input className={formStyle.input} type="submit" value="Login"></input>        
    </form>
  )
}


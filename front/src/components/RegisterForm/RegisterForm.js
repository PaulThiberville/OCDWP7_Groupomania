import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import formStyle from '../../formStyle.module.scss'

import {registerUser,loginUser} from '../../services/auth'


export default function RegisterForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async ({firstName,lastName,email,password})=>{
      const registred = await registerUser(
          firstName,
          lastName,
          email,
          password,
      )
      if(registred){
        const user = await loginUser(email,password)
        if(user){
          dispatch({
            type:"user/setUser",
            payload:user
          })
          navigate("/")
        }
      }
    }

  return (
    <form className={formStyle.form} name='registerForm' onSubmit={handleSubmit(async data => await onSubmit(data))}>
        <div>
          <label>First name</label>
          <input 
            className={formStyle.input}
            type="text"
            required={true} 
            minLength={2} 
            maxLength={20} 
            pattern="^[A-Za-z]+$"
            title="First name should only contain letters. e.g. John" 
            {...register("firstName")}
          />
        </div>

        <div>
          <label>Last name</label>
          <input 
            className={formStyle.input}
            type="text" 
            required={true}
            minLength={2} 
            maxLength={20} 
            pattern="^[A-Za-z]+$"
            title="Last name should only contain letters. e.g. John" 
            {...register("lastName")}
          />
        </div>
        
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

        <input className={formStyle.input} type="submit" value="Register"></input>        
    </form>
  )
}

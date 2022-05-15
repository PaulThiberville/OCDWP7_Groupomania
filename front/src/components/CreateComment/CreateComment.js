import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../../services/comments'
import { useForm } from 'react-hook-form'
import formStyle from '../../formStyle.module.scss'

export default function CreateComment({postId}) {
    const dispatch = useDispatch()
    const textInput = useRef()
    const { register, handleSubmit, formState: { errors } } = useForm();
    

    const onSubmit = async ({text}) =>{
      console.log(text)
      const comment = await createComment(postId, text)
      if(comment){
        dispatch({
          type:"post/addComment",
          payload: comment.id
        })
        dispatch({
          type:"comments/addComment",
          payload: comment
        })
      }
    }

  return (
    <form className={formStyle.form} name='createCommentForm' onSubmit={handleSubmit(async data => await onSubmit(data))}>

      <div>
        <label>Text</label>
        <input 
          className={formStyle.input}
          type="textarea"
          required={true} 
          minLength={1} 
          maxLength={250} 
          {...register("text")}
        />
      </div>

        <input type="submit" value="Create"></input>

    </form>
  )
}

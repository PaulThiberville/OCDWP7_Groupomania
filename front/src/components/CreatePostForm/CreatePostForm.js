import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../../services/posts'
import { useForm } from 'react-hook-form'
import formStyle from '../../formStyle.module.scss'

export default function CreatePostForm({onClose}) {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [preview,setPreview] = useState()


    const onSubmit = async({text,file})=>{
      const newPost = await createPost(text, file[0])
      if(newPost){
        onClose()
        dispatch({
          type: "home/addPost",
          payload: newPost
        })
        dispatch({
          type: "profile/addPost",
          payload: newPost
        })
      }
  }


  const onInput = (e)=>{
    if (e.target.files && e.target.files.length > 0) {
      setPreview(e.target.files[0]);
    }
  }

  return (
    <form className={formStyle.form} name='createPostForm' onSubmit={handleSubmit(async data => await onSubmit(data))}>

        <div>
          <label htmlFor="textInput">Text</label>
          <input className={formStyle.input}
            type="textarea"
            id="textInput"
            required={true} 
            minLength={1} 
            maxLength={250} 
            {...register("text")}
          />
        </div>

        <div>
          <label className={formStyle.fileLabel} htmlFor="fileInput">
            {preview ? <img className={formStyle.preview} src={ URL.createObjectURL(preview)} /> :"Select Image"}
            <input 
            id="fileInput"
              className={formStyle.fileInput}
              onInput={onInput}
              type="file"
              {...register("file")}
            />
          </label>
        </div>
  
        <input type="submit" value="Create" className={formStyle.input}></input>

    </form>
  )
}

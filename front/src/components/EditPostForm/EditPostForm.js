import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { editPost } from '../../services/posts'
import { useForm } from 'react-hook-form'
import formStyle from '../../formStyle.module.scss'
 

export default function EditPostForm({postId, onClose,currentText}) {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [preview,setPreview] = useState()
  
  const onSubmit = async({text,file})=>{
    const newText = text === "" ? currentText : text
    const updatedPost = await editPost(newText, file[0], postId )
    console.log("updatedPost:",updatedPost)
    if(updatedPost){
      dispatch({
        type:"home/editPost",
        payload:updatedPost
      })
      dispatch({
        type:"post/editPost",
        payload:updatedPost
      })
      dispatch({
        type:"profile/editPost",
        payload:updatedPost
      })
    }
    onClose()
  }

  const onInput = (e)=>{
    if (e.target.files && e.target.files.length > 0) {
      setPreview(e.target.files[0]);
    }
  }

  return (
    <form className={formStyle.form} name='editPostForm' onSubmit={handleSubmit(async data => await onSubmit(data))}>

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

        <input type="submit" value="Edit" className={formStyle.input}></input>

    </form>
  )
}

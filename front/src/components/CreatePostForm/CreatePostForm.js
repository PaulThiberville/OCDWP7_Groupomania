import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../services/posts";
import { useForm } from "react-hook-form";
import formStyle from "../../formStyle.module.scss";

//This component is used into a <Modal /> component to create a new post
export default function CreatePostForm({ onClose }) {
  const dispatch = useDispatch();

  //We use reak-hook-form UseForm hook to make binding easy and trigger onSubmit when our form is valid
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState();

  //Call services then redux to add post
  const onSubmit = async ({ text, file }) => {
    const newPost = await createPost(text, file[0]);
    if (newPost) {
      onClose();
      dispatch({
        type: "home/addPost",
        payload: newPost,
      });
      dispatch({
        type: "profile/addPost",
        payload: newPost,
      });
    }
  };

  //Set the preview state on file input change
  const onInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPreview(e.target.files[0]);
    }
  };

  return (
    <form
      className={formStyle.form}
      name="createPostForm"
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
    >
      <div>
        <label htmlFor="textInput">Text</label>
        <input
          className={formStyle.input}
          type="textarea"
          id="textInput"
          required={true}
          minLength={1}
          maxLength={250}
          autoComplete="off"
          {...register("text")}
        />
      </div>

      <div>
        <label className={formStyle.fileLabel} htmlFor="fileInput">
          {preview ? (
            //If we have a preview , display it
            //else, display "Select Image"
            <img
              className={formStyle.preview}
              src={URL.createObjectURL(preview)}
              alt="preview"
            />
          ) : (
            "Select Image"
          )}
          <input
            id="fileInput"
            className={formStyle.fileInput}
            onInput={onInput}
            type="file"
            {...register("file")}
          />
        </label>
      </div>

      <input type="submit" value="Create" className={formStyle.submit}></input>
    </form>
  );
}

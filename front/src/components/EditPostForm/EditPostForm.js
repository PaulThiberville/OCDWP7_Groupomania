import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editPost } from "../../services/posts";
import { useForm } from "react-hook-form";
import formStyle from "../../formStyle.module.scss";

//This component is used into a <Modal /> component to edit a post
export default function EditPostForm({ postId, onClose, currentText }) {
  //We use reak-hook-form UseForm hook to make binding easy and trigger onSubmit when our form is valid
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [preview, setPreview] = useState();

  //Call services then redux to edit post
  const onSubmit = async ({ text, file }) => {
    const newText = text === "" ? currentText : text;
    const updatedPost = await editPost(newText, file[0], postId);
    if (updatedPost) {
      dispatch({
        type: "home/editPost",
        payload: updatedPost,
      });
      dispatch({
        type: "post/editPost",
        payload: updatedPost,
      });
      dispatch({
        type: "profile/editPost",
        payload: updatedPost,
      });
    }
    onClose();
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
      name="editPostForm"
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
    >
      <div>
        <label>Text</label>
        <input
          className={formStyle.input}
          type="textarea"
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

      <input type="submit" value="Edit" className={formStyle.submit}></input>
    </form>
  );
}

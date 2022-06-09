import React from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../services/comments";
import { useForm } from "react-hook-form";
import formStyle from "../../formStyle.module.scss";

//This component is used to create a new comment
export default function CreateComment({ postId }) {
  const dispatch = useDispatch();

  //We use reak-hook-form UseForm hook to make binding easy and trigger onSubmit when our form is valid
  const { register, handleSubmit, reset } = useForm();

  //Call services then redux to add comment
  const onSubmit = async ({ text }) => {
    const comment = await createComment(postId, text);
    if (comment) {
      dispatch({
        type: "post/addComment",
        payload: comment.id,
      });
      dispatch({
        type: "comments/addComment",
        payload: comment,
      });
      reset();
    }
  };

  return (
    <form
      className={formStyle.commentForm}
      name="createCommentForm"
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
    >
      <div>
        <label>Comment</label>
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

      <input type="submit" value="Create" className={formStyle.submit}></input>
    </form>
  );
}

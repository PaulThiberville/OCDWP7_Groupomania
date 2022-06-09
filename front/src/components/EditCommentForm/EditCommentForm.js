import React from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../services/comments";
import { useForm } from "react-hook-form";
import formStyle from "../../formStyle.module.scss";

//This component is used into a <Modal /> component to edit a comment
export default function EditCommentForm({ comment, onClose, currentText }) {
  //We use reak-hook-form UseForm hook to make binding easy and trigger onSubmit when our form is valid
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  //Call services then redux to edit comment
  const onSubmit = async ({ text }) => {
    const updatedComment = await editComment(comment.id, text);
    if (updatedComment) {
      updatedComment.User = comment.User;
      dispatch({
        type: "comments/editComment",
        payload: updatedComment,
      });
    }
    onClose();
  };

  return (
    <form
      className={formStyle.form}
      name="editCommentForm"
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
          {...register("text")}
        />
      </div>

      <input type="submit" value="Edit" className={formStyle.input}></input>
    </form>
  );
}

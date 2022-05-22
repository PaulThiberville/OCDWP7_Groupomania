import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUser } from "../../services/users";
import { useForm } from "react-hook-form";
import formStyle from "../../formStyle.module.scss";

//This component is used into a <Modal /> component to edit a profile
export default function EditProfileForm({ profile, onClose }) {
  //We use reak-hook-form UseForm hook to make binding easy and trigger onSubmit when our form is valid
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [preview, setPreview] = useState();

  //Call services then redux to edit profile
  const onSubmit = async ({ firstName, lastName, bio, file }) => {
    const updatedProfile = await editUser(
      profile.id,
      firstName ? firstName : profile.firstName,
      lastName ? lastName : profile.lastName,
      bio ? bio : profile.bio,
      file[0]
    );
    if (updatedProfile) {
      dispatch({
        type: "profile/setUser",
        payload: updatedProfile,
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
      name="editProfileForm"
      onSubmit={handleSubmit(async (data) => await onSubmit(data))}
    >
      <div>
        <label>FirstName</label>
        <input
          className={formStyle.input}
          type="textarea"
          required={true}
          minLength={1}
          maxLength={20}
          {...register("firstName")}
          defaultValue={profile.firstName}
        />
      </div>

      <div>
        <label>LastName</label>
        <input
          className={formStyle.input}
          type="textarea"
          required={true}
          minLength={1}
          maxLength={20}
          {...register("lastName")}
          defaultValue={profile.lastName}
        />
      </div>

      <div>
        <label>Bio</label>
        <input
          className={formStyle.input}
          type="textarea"
          required={true}
          minLength={1}
          maxLength={250}
          {...register("bio")}
          defaultValue={profile.bio}
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

      <input type="submit" className={formStyle.submit} value="Edit"></input>
    </form>
  );
}

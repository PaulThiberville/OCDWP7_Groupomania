import React, { useState, useEffect } from "react";

import { deleteUser, getOneUser } from "../../services/users";

import Loader from "../Loader/Loader";

import style from "./Profile.module.scss";
import logo from "../../images/groupomania.svg";
import { useDispatch, useSelector } from "react-redux";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import Modal from "../Modal/Modal";

//This component is used to display informations from a user profile
//Also display buttons to edit or delete profile if needed
export default function ProfileView({ userId }) {
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);
  const [isMine, setIsMine] = useState();

  //Call user service to get user
  const getUser = async () => {
    const currentUser = await getOneUser(userId);
    if (currentUser) {
      dispatch({
        type: "profile/setUser",
        payload: currentUser,
      });
    }
  };

  //Called only one time
  useEffect(() => {
    getUser().catch(console.error);
    const localUser = JSON.parse(localStorage.getItem("user"));
    //Check if this is the user's profile or the user is admin
    if (localUser.userId === userId || localUser.role === "admin") {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, []);

  if (!user) {
    return <Loader />;
  }

  //Call services then redux to delete user
  const onDelete = async () => {
    await deleteUser(userId);
    dispatch({ type: "user/deleteUser" });
  };

  return (
    <div className={style.profile}>
      <img
        src="http://picsum.photos/900/300"
        alt="Banner"
        className={style.banner}
      />
      <img
        src={user.imageUrl === "" ? logo : user.imageUrl}
        alt={user.firstName}
        className={style.image}
      />
      <div className={style.body}>
        <div className={style.userInfos}>
          <h2>{`${user.firstName} ${user.lastName}`}</h2>
          <p>{user.bio}</p>
        </div>
        {isMine === true && (
          <div className={style.userEdit}>
            <button
              className="color--blue"
              onClick={() => setIsEditProfileFormOpen(true)}
            >
              Edit
            </button>
            <Modal
              open={isEditProfileFormOpen}
              onClose={() => setIsEditProfileFormOpen(false)}
            >
              <EditProfileForm
                profile={user}
                onClose={() => {
                  setIsEditProfileFormOpen(false);
                }}
              />
            </Modal>
            <button
              className="color--red"
              onClick={async () => await onDelete()}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

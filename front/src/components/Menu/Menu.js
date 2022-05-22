import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../services/auth";

import Modal from "../Modal/Modal";
import CreatePostForm from "../CreatePostForm/CreatePostForm";

import logo from "../../images/groupomania.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import style from "./Menu.module.scss";
import { useDispatch } from "react-redux";

//This component contain some links for navigation and buttons for actions
export default function Menu({ setUser }) {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Ask redux to logout user
  const onLogout = async () => {
    await logout();
    dispatch({
      type: "user/deleteUser",
      payload: "",
    });
    navigate("/");
  };

  return (
    <header className={style.menu}>
      <div className={style.logoContainer}>
        <img className={style.image} src={logo} alt="groupomania" />
        <h1>Groupomania</h1>
      </div>
      <nav className={style.nav}>
        <div className={style.links}>
          <Link to={"/"} className={style.link}>
            <FontAwesomeIcon icon={faHouse} className={style.icon} />
            Home
          </Link>

          <Link to={"/profile/" + user.userId} className={style.link}>
            <FontAwesomeIcon icon={faUser} className={style.icon} />
            Profile
          </Link>
        </div>

        <div className={style.buttons}>
          <button onClick={() => setIsPostOpen(true)} className="color--blue">
            Post
          </button>
          <Modal open={isPostOpen} onClose={() => setIsPostOpen(false)}>
            <CreatePostForm onClose={() => setIsPostOpen(false)} />
          </Modal>

          <button
            className="color--red"
            onClick={async (e) => await onLogout(e)}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

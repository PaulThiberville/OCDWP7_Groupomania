import React, { useState } from "react";
import style from "./Login.module.scss";

import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

import logo from "../../images/groupomania.svg";

//This component is used for navigation through the register and login process with Modals
export default function Login() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <section className={style.login}>
      <div className={style.panel} />
      <img
        className={style.image}
        src="http://picsum.photos/1400?blur"
        alt="Background"
      />
      <div className={style.container}>
        <img className={style.logo} src={logo} alt="Groupomania" />
        <h2 className={style.h2}>Groupomania</h2>
        <button onClick={() => setIsLoginOpen(true)}>Login</button>
        <Modal open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
          <LoginForm />
        </Modal>
        <button onClick={() => setIsRegisterOpen(true)}>Register</button>
        <Modal open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
          <RegisterForm />
        </Modal>
      </div>
    </section>
  );
}

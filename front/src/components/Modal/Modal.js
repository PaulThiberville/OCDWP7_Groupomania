import React from "react";
import ReactDOM from "react-dom";

import style from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//This component is used to display components in a container over everything else
export default function Modal({ open, children, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className={style.overlay} />
      <div className={style.modal}>
        <button onClick={onClose} className={style.close}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className={style.content}>{children}</div>
      </div>
    </>,
    document.getElementById("modal")
  );
}

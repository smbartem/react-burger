import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const { children, title, handleModalClose } = props;
    
  const closeModalWindowByEsc = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    },
    [handleModalClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeModalWindowByEsc, false);
    return () => {
      document.removeEventListener("keydown", closeModalWindowByEsc, false);
    };
  }, [closeModalWindowByEsc]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay handleModalClose={handleModalClose}/>
      <div className={styles.modal}>
        <header className={`${styles.modalHeader} pt-10 pl-10 pr-10`}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button
            type="button"
            className={styles.modalButton}
            onClick={handleModalClose}
          >
            <CloseIcon type="primary" />
          </button>
        </header>
        <section className={`${styles.modalMain} mt-4`}>{children}</section>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;

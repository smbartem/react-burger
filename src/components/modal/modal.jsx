import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = (props) => {
  const { children, handleModal, title } = props;
  const modalRoot = document.getElementById("react-modals");

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        handleModal();
      }
    },
    [handleModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay handleKeyDown={handleKeyDown} handleModal={handleModal} />
      <div className={styles.modal}>
        <header className={`${styles.modalHeader} pt-10 pl-10 pr-10`}>
          <h2 className="text text_type_main-large">{title}</h2>
          <button
            type="button"
            className={styles.modalButton}
            onClick={handleModal}
          >
            <CloseIcon type="primary" />
          </button>
        </header>
        <main className={`${styles.modalMain} mt-4`}>{children}</main>
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;

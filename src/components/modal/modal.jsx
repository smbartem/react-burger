import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import styles from "./modal.module.css";

const Modal = (props) => {
  const { children, handleModal, title } = props;
  return (
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
      <main className={`${styles.modalMain} mt-4`}>
        {children}
      </main>
    </div>
  );
};

Modal.propTypes = {
  handleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;

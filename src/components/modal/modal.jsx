import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL_ORDER_DETAILS, CLOSE_MODAL_INGREDIENT_DETAILS } from "../../services/actions/interface-actions";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const { children, title } = props;
  const dispatch = useDispatch();
  const { isModalIngredientDetailsOpen, isModalOrderDetailsOpen } = useSelector(store => store.interfaceReducer);
  const handleModalClose = useCallback(() => {
    isModalIngredientDetailsOpen && dispatch({type: CLOSE_MODAL_INGREDIENT_DETAILS});
    isModalOrderDetailsOpen && dispatch({type: CLOSE_MODAL_ORDER_DETAILS});
  }, [dispatch, isModalIngredientDetailsOpen, isModalOrderDetailsOpen])
  
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
      <ModalOverlay />
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

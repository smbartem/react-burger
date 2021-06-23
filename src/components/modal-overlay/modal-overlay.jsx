import React, { useCallback } from "react";
import styles from "./modal-overlay.module.css";
import { CLOSE_MODAL_ORDER_DETAILS, CLOSE_MODAL_INGREDIENT_DETAILS } from "../../services/actions/interface-actions";
import { useDispatch, useSelector } from "react-redux";

const ModalOverlay = () => {
  const dispatch = useDispatch();
  const { isModalIngredientDetailsOpen, isModalOrderDetailsOpen } = useSelector(store => store.interfaceReducer);
  const handleModalClose = useCallback(() => {
    isModalIngredientDetailsOpen && dispatch({type: CLOSE_MODAL_INGREDIENT_DETAILS});
    isModalOrderDetailsOpen && dispatch({type: CLOSE_MODAL_ORDER_DETAILS});
  }, [dispatch, isModalIngredientDetailsOpen, isModalOrderDetailsOpen])
  return <div className={styles.modalOverlay} onClick={handleModalClose}></div>;
};

export default ModalOverlay;

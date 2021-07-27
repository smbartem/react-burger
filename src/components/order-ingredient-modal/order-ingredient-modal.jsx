import { useCallback, useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import style from "./order-ingredient-modal.module.css";
import OrderIngredients from "../order-ingredients/order-ingredients";

const OrderIngredientModal = ({ order, handleModalClose, ingredients }) => {
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
  
  return(
    <>
      <ModalOverlay handleModalClose={handleModalClose}/>
      <div className={style.modal}>
        <OrderIngredients order={order} handleModalClose={handleModalClose} ingredients={ingredients} isModal={true}/>
      </div>
    </>
  )
};

export default OrderIngredientModal;
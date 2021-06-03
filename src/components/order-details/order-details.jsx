import React from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import styles from "./order-details.module.css"

const OrderDetails = (props) => {
  const modalRoot = document.getElementById("react-modals");
  const { handleModal, selectedIngredient } = props;
  
  return ReactDOM.createPortal(
    <>
      <ModalOverlay
        handleModal={handleModal}
      />
      <Modal
        handleModal={handleModal}
        title="Детали ингредиента"
      >
        <img src={selectedIngredient.image_large} alt="ingredientPicture" className="mb-4"/>
        <h2 className="text text_type_main-medium mb-8">{selectedIngredient.name}</h2>
        <div className={`${styles.informationContainer} mb-15`}>
          <div className={styles.flexCenter}>
            <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
            <p className="text text_type_main-default text_color_inactive">{selectedIngredient.calories}</p>
          </div>
          <div className={styles.flexCenter}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_main-default text_color_inactive">{selectedIngredient.proteins}</p>
          </div>
          <div className={styles.flexCenter}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_main-default text_color_inactive">{selectedIngredient.fat}</p>
          </div>
          <div className={styles.flexCenter}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_main-default text_color_inactive">{selectedIngredient.carbohydrates}</p>
          </div>
        </div>
      </Modal>
    </>,
    modalRoot
  );
};

OrderDetails.propTypes = {
  handleModal: PropTypes.func.isRequired,
  selectedIngredient: PropTypes.func.isRequired,
};

export default OrderDetails;

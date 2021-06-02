import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import doneLogo from "../../images/done.svg";

const IngredientDetails = (props) => {
  const modalRoot = document.getElementById("react-modals");

  return ReactDOM.createPortal(
    <>
      <ModalOverlay
        handleModal={props.handleModal}
      />
      <Modal
        handleModal={props.handleModal}
        title=""
      >
        <h2 className="text text_type_digits-large mb-8">034536</h2>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img src={doneLogo} alt="doneLogo" className="mb-15" />
        <p className="text text_type_main-default mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive mb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      </Modal>
    </>,
    modalRoot
  );
};

export default IngredientDetails;

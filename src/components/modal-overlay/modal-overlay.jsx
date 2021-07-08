import React from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({handleModalClose}) => {  
  return <div className={styles.modalOverlay} onClick={handleModalClose}></div>;
};

ModalOverlay.propTypes = {
  handleModalClose: PropTypes.func.isRequired,
};

export default ModalOverlay;

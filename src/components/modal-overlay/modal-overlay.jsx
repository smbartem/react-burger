import React from "react";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({handleModalClose}) => {  
  return <div className={styles.modalOverlay} onClick={handleModalClose}></div>;
};

export default ModalOverlay;

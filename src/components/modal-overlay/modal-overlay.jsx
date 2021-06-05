import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";


const ModalOverlay = (props) => {
  const overlayHeight = useMemo(() => document.getElementById("root").offsetHeight, []);
  return (
    <div
      className={styles.modalOverlay}
      style={{ height: overlayHeight }}
      onClick={props.handleModal}
      onKeyDown={props.handleKeyDown}
    ></div>
  );
};

ModalOverlay.propTypes = {
  handleModal: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

export default ModalOverlay;

import React, { useEffect, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import styles from "./modal-overlay.module.css";


const ModalOverlay = (props) => {
  const overlayHeight = useMemo(() => document.getElementById("root").offsetHeight, []);

  const handleKeyDown = useCallback ((e) => {
    if (e.keyCode === 27) {
      props.handleModal()
    }
  }, [props])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false)
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false)
    }
  }, [handleKeyDown])

  return (
    <div
      className={styles.modalOverlay}
      style={{ height: overlayHeight }}
      onClick={props.handleModal}
      onKeyDown={handleKeyDown}
    ></div>
  );
};

ModalOverlay.propTypes = {
  handleModal: PropTypes.func.isRequired,
};

export default ModalOverlay;

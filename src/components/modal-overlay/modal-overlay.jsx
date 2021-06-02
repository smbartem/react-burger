import React, { useEffect, useCallback, useMemo } from "react";
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

export default ModalOverlay;

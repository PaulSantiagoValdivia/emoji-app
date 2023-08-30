import React from "react";
import styles from "./modal.module.css";

const ModalBody = ({setShowModal}) => {


  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2 className={styles.h2}>THE EMOJIS SEQUENCE IS NOT AVAILABLE</h2>
        <button
          className={styles.closeButton}
          onClick={() => setShowModal(false)}
        >
        MEH ,  GO BACK
        </button>
      </div>
    </div>
  );
};

export default ModalBody;

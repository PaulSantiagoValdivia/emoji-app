import React from "react";
import styles from "./loading.module.css";
import {TiFlashOutline } from "react-icons/ti";

const LoadingScreen = () => {
  return (
    <div className={styles.loadingOverlay}>
        <div className={styles.ray}>
          <TiFlashOutline className={styles.loadingIcon} />
      </div>
    </div>
  );
};

export default LoadingScreen;

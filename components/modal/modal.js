import React from "react";
import styles from "./modal.module.css";
import { FaDiscord } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

const Modal = ({ showModal, setShowModal, handleCreateAccount }) => {

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
      });

      if (error) {
        console.error("Error de inicio de sesión:", error.message);
        // Puedes mostrar un mensaje de error al usuario si lo deseas
      } else {
        // El inicio de sesión con Discord fue exitoso
        // Puedes acceder a los datos del usuario a través de data.user
        handleCreateAccount()
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error.message);
      // Puedes mostrar un mensaje de error al usuario si lo deseas
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.h2}>¡ESTÁS A UN PASO DE TENER UN ENLACE IMPRESIONANTE!</h2>
        <button className={styles.loginButton} onClick={handleLogin}>
          <FaDiscord className={styles.discordIcon} />
          SIGN UP WITH Discord
        </button>
        <button
          className={styles.closeButton}
          onClick={() => setShowModal(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;

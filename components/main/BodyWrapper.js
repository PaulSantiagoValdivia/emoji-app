import React from "react";
import { RiDeleteBinLine, RiSearchLine } from "react-icons/ri";
import styles from "./body.module.css";
import { supabase } from "@/lib/supabaseClient";

import ModalBody from "../modal/ModalBody";
const BodyWrapper = ({
  selectedEmojis,
  setSelectedEmojis,
  handleCreateAccount,
  setShowButton,
  showButton,
  handleCreateAccountBack,
  handleLoveIt,
}) => {
  const [showAddEmojisText, setShowAddEmojisText] = React.useState(false);
  const [showFindYouText, setShowFindYouText] = React.useState(false);
  const [showRemoveButton, setShowRemoveButton] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false)
  React.useEffect(() => {
    if (selectedEmojis.length === 1) {
      setShowAddEmojisText(true);
      setShowFindYouText(false);
      setShowRemoveButton(true)
    } else if (selectedEmojis.length === 2) {
      setShowAddEmojisText(true);
      setShowFindYouText(false);
    } else if (selectedEmojis.length === 3) {
      setShowAddEmojisText(false);
      setShowFindYouText(true);
    } else {
      setShowAddEmojisText(false);
      setShowFindYouText(false);
    }
  }, [selectedEmojis]);

  const handleRemoveEmoji = (emoji) => {
    const updatedEmojis = [...selectedEmojis];
    const index = updatedEmojis.indexOf(emoji);
    if (index > -1) {
      updatedEmojis.splice(index, 1);
      setSelectedEmojis(updatedEmojis);
    }
  };


  const handleMakeYours = async () => {
    // Convertir emojis seleccionados en una cadena JSON
    const emojisString = JSON.stringify(selectedEmojis);

    // Obtener todas las secuencias de emojis de la base de datos
    const { data: usuariosData, error: usuariosError } = await supabase
      .from('usuarios')
      .select('emojis');

    if (usuariosError) {
      console.error('Error al obtener las secuencias de emojis:', usuariosError);
      // Aquí puedes mostrar un mensaje de error al usuario o tomar alguna otra acción
      return;
    }

    // Verificar si la secuencia de emojis seleccionada ya está en uso
    const isEmojisTaken = usuariosData.some(usuario => JSON.stringify(usuario.emojis) === emojisString);

    if (isEmojisTaken) {
      console.log('La secuencia de emojis ya está en uso por otro usuario');
      setShowModal(true);
      // Aquí puedes mostrar un mensaje de error al usuario o tomar alguna otra acción
    } else {
      // La secuencia de emojis está disponible
      handleCreateAccount();
      setShowRemoveButton(false);

    }
  };

  const handleGoBack = () => {
    setShowRemoveButton(true)
    setShowButton(true);
    handleCreateAccountBack();
  };

  return (
    <div className={styles.selectedEmojiWrapper}>
      {selectedEmojis.length === 0 ? (
        <div className={styles.textContent}>

          <div className={styles.divText}><RiSearchLine className={styles.iconDiv} />GM FREN, PRESS ANY EMOJI TO START</div>
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.selectedEmojiContainer}>
            {selectedEmojis.map((emoji, index) => (
              <span className={styles.emoji} key={index}>
                {emoji}
                {showRemoveButton && (
                  <button
                    className={styles.buttonRemove}
                    onClick={() => handleRemoveEmoji(emoji)}
                  >
                    <RiDeleteBinLine className={styles.icon} />
                  </button>
                )}
              </span>
            ))}
          </div>
          {showAddEmojisText && (
            <div className={styles.textWrapper}>
              <a href={`web5.gg/${selectedEmojis.join("")}`} className={styles.textLink}>
                <span className={styles.textLink}>web5.gg/</span>
              </a>
              {selectedEmojis.join("")}
            </div>
          )}
          {showAddEmojisText && selectedEmojis.length < 3 && (
            <p className={styles.textInfo}>Add three emojis in total to continue</p>
          )}
          {showFindYouText && (
            <>
              <div className={styles.textWrapper}>
                <a href={`web5.gg/${selectedEmojis.join("")}`} className={styles.textLink}>
                  <span className={styles.textLink}>web5.gg/</span>
                </a>
                {selectedEmojis.join("")}
              </div>
              {showButton ? (
                <p className={styles.textInfo}>
                  People will be able to find you through this link:
                </p>
              ) : (
                <p className={styles.textInfo}>wohoo! well hello there, this looks awesome!</p>
              )}
            </>
          )}
          {selectedEmojis.length === 3 && showButton && (
            <button className={styles.buttonMain} onClick={handleMakeYours}>
              MAKE THIS YOURS
            </button>
          )}
          {!showButton && (
            <div className={styles.divButton}>
              <button className={styles.buttonMain} onClick={handleLoveIt}>
                I LOVE IT !
              </button>
              <button className={styles.back} onClick={handleGoBack}>MeH go back</button>
            </div>
          )}
        </div>
      )}
      {showModal && (
        <ModalBody setShowModal={setShowModal} />
      )}
    </div>
  );
};
export default BodyWrapper;
import React from "react";
import styles from "./body.module.css";

const BodyWrapper = ({ selectedEmojis }) => {
  const [showAddEmojisText, setShowAddEmojisText] = React.useState(false);
  const [showFindYouText, setShowFindYouText] = React.useState(false);

  React.useEffect(() => {
    if (selectedEmojis.length === 1) {
      setShowAddEmojisText(true);
      setShowFindYouText(false);
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

  return (
    <div className={styles.selectedEmojiWrapper}>
      {selectedEmojis.length === 0 ? (
        <div className={styles.textWrapper}>GM FREN, PRESS ANY EMOJI TO START</div>
      ) : (
        <div className={styles.main}>
          <div className={styles.selectedEmojiContainer}>
            {selectedEmojis.map((emoji) => (
              <span key={emoji} className={styles.emoji}>
                {emoji}
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
              <p className={styles.textInfo}>
                People will be able to find you through this link:
              </p>
            </>
          )}
          {selectedEmojis.length === 3 && (
            <button
              className={styles.buttonMain}
              onClick={() => console.log("Proceder con la creación de la cuenta")}
            >
              MAKE THIS YOURS
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BodyWrapper;
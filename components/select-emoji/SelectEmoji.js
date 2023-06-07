import styles from "./emoji.module.css";

const SelectEmoji = ({ emojis, activeCategory, onEmojiClick, selectedEmojis }) => {
  const category = emojis.find((category) => category.category === activeCategory);
  const disabled = selectedEmojis.length >= 3;

  const handleEmojiClick = (emoji) => {
    if (!disabled) {
      onEmojiClick(emoji);
    }
  };

  return (
    <div className={styles.emojiListContainer}>
      {category.icons.map((emoji) => (
        <div
          key={emoji}
          onClick={() => handleEmojiClick(emoji)}
          className={`${styles.emojiButton} ${disabled ? styles.disabled : ""}`}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default SelectEmoji;

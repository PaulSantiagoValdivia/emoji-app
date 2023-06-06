import styles from "./emoji.module.css";

const SelectEmoji = ({ emojis, activeCategory, onEmojiClick }) => {
  const category = emojis.find((category) => category.category === activeCategory);

  return (
    <div className={styles.emojiListContainer}>
      {category.icons.map((emoji) => (
        <div
          key={emoji}
          onClick={() => onEmojiClick(emoji)}
          className={styles.emojiButton}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default SelectEmoji;
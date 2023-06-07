import React from "react";
import styles from "./emoji.module.css";

const EmojiMenu = ({ emojis, setActiveCategory, activeCategory,selectedEmojis }) => {
  const disabled = selectedEmojis.length >= 3;
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className={styles.categoryMenu}>
      <div className={styles.categoryMenu}>
        {emojis.map((category) => (
          <div
            key={category.category}
            onClick={() => handleCategoryClick(category.category)}
            className={`${styles.categoryButton} ${
              category.category === activeCategory ? styles.active : ""
            } ${disabled ? styles.disabled : ""}`} // Agrega la clase CSS 'disabled' si está deshabilitado
          >
            {category.category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiMenu;

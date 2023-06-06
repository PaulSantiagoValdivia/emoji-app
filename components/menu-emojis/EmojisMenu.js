import React from "react";
import styles from "./emoji.module.css";

const EmojiMenu = ({ emojis, setActiveCategory, activeCategory }) => {
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
            }`}
          >
            {category.category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiMenu;

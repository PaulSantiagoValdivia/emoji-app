import React, { useState } from "react";
import EmojiMenu from "../menu-emojis/EmojisMenu";
import SelectEmoji from "../select-emoji/SelectEmoji";
import styles from './styles.module.css'

const ContentEmojis = ({ emojis, onEmojiClick, selectedEmojis }) => {
  const [activeCategory, setActiveCategory] = useState(emojis[0].category);

  return (
    <div className={styles.container}>
      <EmojiMenu
        emojis={emojis}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <SelectEmoji
        emojis={emojis}
        activeCategory={activeCategory}
        onEmojiClick={onEmojiClick}
        selectedEmojis={selectedEmojis}
      />
    </div>
  );
};

export default ContentEmojis;


import ContentEmojis from "@/components/emojis/ContentEmojis";
import Nav from "@/components/header/Header";
import BodyWrapper from "@/components/main/BodyWrapper";
import React, { useState, useEffect } from "react"
import styles from '../public/page.module.css'
import Form from "@/components/form/Form";
const emojis = [
  {
    category: "smileys & peopple",
    icons: [
      "😂",
      "😇",
      "🙃",
      "😍",
      "😜",
      "😘",
      "🤓",
      "😎",
      "😏",
      "🥺",
      "😢",
      "🤯",
      "😱",
      "🤔",
      "😶",
      "😵",
      "🤐",
      "🤢",
      "🤧",
      "😷",
      "🤕",
      "🤑",
      "🤠",
      "❤️",
      "😈",
      "🤡",
      "💩",
      "👻",
      "☠️",
      "👽",
      "👾",
      "🤖",
      "🎃",
      "💪",
      "💋",
      "💄",
      "👂",
      "👃",
      "👣",
      "👁️",
      "👀",
      "🧠",
      "👶",
      "👏",
      "🤝",
      "🙌",
      "👍",
      "👎",
      "✊",
      "✌️",
      "🤘",
      "👌",
      "👉",
      "👋",
      "✍️",
      "🙏",
      "💅",
      "🦶",
      "🤳",
      "💃",
      "👕",
      "👖",
      "👗",
      "👙",
      "👘",
      "👠",
      "👢",
      "👞",
      "👟",
      "🎩",
      "🧢",
      "👒",
      "🎓",
      "👑",
      "💍",
      "👛",
      "💼",
      "🎒",
      "💔",
      "🥶",
      "🤬",
      "💤",
      "👅",
      "🥳",
      "💊",
    ]
  }, {
    category: "Animal & Nature",
    icons: [
      "🐶",
      "🐱",
      "🐭",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐮",
      "🐨",
      "🐯",
      "🦁",
      "🐷",
      "🐽",
      "🐸",
      "🐵",
      "🙈",
      "🐔",
      "🐧",
      "🐣",
      "🦆",
      "🦅",
      "🦉",
      "🦇",
      "🐺",
      "🐗",
      "🐴",
      "🦄",
      "🐝",
      "🐛",
      "🦋",
      "🐌",
      "🐞",
      "🐜",
      "🕷️",
      "🕸️",
      "🦂",
      "🐢",
      "🐍",
      "🦎",
      "🦖",
      "🐊",
      "🦓",
      "🦍",
      "🦏",
      "🐙",
      "🦀",
      "🐬",
      "🐋",
      "🦈",
      "🐘",
      "🐪",
      "🐃",
      "🐑",
      "🐐",
      "🦌",
      "🦃",
      "🐀",
      "🐾",
      "🐉",
      "🌵",
      "🌲",
      "🌴",
      "🍀",
      "🎋",
      "🍁",
      "🍄",
      "🐚",
      "💐",
      "🌹",
      "🌸",
      "🌻",
      "🌕",
      "🌙",
      "⭐",
      "✨",
      "⚡",
      "☄️",
      "💥",
      "🔥",
      "🌪️",
      "🌈",
      "☀️",
      "☁️",
      "❄️",
      "⛄",
      "💨",
      "💦",
      "🌊"
    ],
  }, {
    category: "food",
    icons: [
      "🍎",
      "🍐",
      "🍊",
      "🍋",
      "🍌",
      "🍉",
      "🍇",
      "🍓",
      "🍈",
      "🍒",
      "🍑",
      "🍍",
      "🥝",
      "🍆",
      "🥑",
      "🥒",
      "🌶️",
      "🌽",
      "🥕",
      "🥔",
      "🥐",
      "🍞",
      "🧀",
      "🥚",
      "🍳",
      "🥞",
      "🥓",
      "🍗",
      "🌭",
      "🍔",
      "🍟",
      "🍕",
      "🥙",
      "🌮",
      "🌯",
      "🥗",
      "🍝",
      "🍜",
      "🍣",
      "🍱",
      "🍤",
      "🍚",
      "🍘",
      "🍥",
      "🍡",
      "🍦",
      "🎂",
      "🍭",
      "🍬",
      "🍫",
      "🍿",
      "🍩",
      "🍪",
      "🥜",
      "🌰",
      "🍯",
      "🥛",
      "🍼",
      "☕",
      "🍵",
      "🍶",
      "🍺",
      "🍷",
      "🥃",
      "🍸",
      "🍾",
      "🥄",
      "🍽️"
    ]
  }, {
    category: "sports",
    icons: [
      "⚽",
      "🏀",
      "🏈",
      "⚾",
      "🎾",
      "🏐",
      "🎱",
      "🏓",
      "🏸",
      "🏒",
      "🏏",
      "🥅",
      "⛳",
      "🏹",
      "🎣",
      "🥊",
      "🥋",
      "🎽",
      "⛸️",
      "🎿",
      "🏆",
      "🎖️",
      "🎟️",
      "🎪",
      "🎭",
      "🎨",
      "🎬",
      "🎤",
      "🎧",
      "🎼",
      "🎹",
      "🥁",
      "🎷",
      "🎺",
      "🎸",
      "🎻",
      "🎲",
      "♟️",
      "🎯",
      "🎳",
      "🎮",
      "🎰",
      "🛹",
      "🎵"
    ],
  }, {
    category: "travel",
    icons: [
      "🏁",
      "🚗",
      "🏎️",
      "🚓",
      "🚑",
      "🚒",
      "🚚",
      "🚜",
      "🚲",
      "🛵",
      "🏍️",
      "🚨",
      "🚠",
      "🚂",
      "✈️",
      "💺",
      "🚀",
      "🛸",
      "🚁",
      "🛶",
      "⛵",
      "🚢",
      "⚓",
      "🚧",
      "🚦",
      "🗺️",
      "🗿",
      "🗽",
      "🗼",
      "🏰",
      "🏯",
      "🏟️",
      "🎡",
      "🎢",
      "🎠",
      "🏖️",
      "⛰️",
      "🏕️",
      "🏠"
    ]
  }, {
    category: "tecnologies",
    icons: [
      "⌚",
      "📱",
      "💻",
      "🖨️",
      "🕹️",
      "💾",
      "📷",
      "🎥",
      "📟",
      "📺",
      "📻",
      "🎛️",
      "⏰",
      "⌛",
      "📡",
      "🔋",
      "🔌",
      "💡",
      "🔦",
      "🕯️",
      "🛢️"
    ],
  }, {
    category: "objects",
    icons: [
      "💵",
      "💰",
      "💳",
      "💎",
      "⚖️",
      "🔧",
      "🔨",
      "🔩",
      "⚙️",
      "⛓️",
      "🔫",
      "💣",
      "🔪",
      "🗡️",
      "🛡️",
      "🚬",
      "⚰️",
      "🏺",
      "🔮",
      "📿",
      "💈",
      "🔭",
      "🔬",
      "🕳️",

      "💉",
      "🚽",
      "🚰",
      "🚿",
      "🛋️",
      "🔑",
      "🚪",
      "🗄️",
      "📎",
      "📏",
      "📐",
      "📌",
      "✂️",
      "🗑️",
      "🖼️",
      "🛍️",
      "🛒",
      "🎁",
      "🎈",
      "🎏",
      "🎀",
      "🎉",
      "🎎",
      "🏮",
      "🎐",
      "✉️",
      "📦",
      "📜",
      "📈",
      "🗞️",
      "📓",
      "📖",
      "🖍️",
      "✏️",
      "🔒",
      "🆔",
      "🔱",
      "⚜️",
      "♻️",
      "🏧",
      "♠️",
      "♣️",
      "🃏",
      "🀄",
      "🔛",
      "🧩"
    ],
  }, {
    category: "symbols",
    icons: [
      "✝️",
      "☪️",
      "🕉️",
      "☸️",
      "✡️",
      "🕎",
      "☯️",
      "☦️",
      "♈",
      "♉",
      "♊",
      "♋",
      "♌",
      "♍",
      "♎",
      "♏",
      "♐",
      "♑",
      "♒",
      "♓",
      "♾️",
      "⚛️",
      "☢️",
      "🆚",
      "🆘",
      "🚫",
      "🚭",
      "🆒",
      "🆕",
      "🆓",
      "🆙",
      "💯",
      "❗",
      "❓",
      "🔔",
      "🔊",
      "💱",
      "▶️"
    ]
  }
]
export default function Home() {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [showContentEmojis, setShowContentEmojis] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false); // Nuevo estado para controlar la visibilidad del formulario
  const [showDiscordButton, setShowDiscordButton] = useState(false); // Nuevo estado

  // ...

  console.log(selectedEmojis);

  function handleEmojiSelection(emoji) {
    if (selectedEmojis.length < 3) {
      const updatedEmojis = [...selectedEmojis, emoji];
      setSelectedEmojis(updatedEmojis);
      localStorage.setItem("selectedEmojis", JSON.stringify(updatedEmojis));
    }
  }

  useEffect(() => {
    const storedEmojis = localStorage.getItem("selectedEmojis");
    if (storedEmojis) {
      setSelectedEmojis(JSON.parse(storedEmojis));
    }
  }, []);

  const handleCreateAccount = () => {
    setShowContentEmojis(false);
    setShowButton(false);
  };

  const handleCreateAccountBack = () => {
    setShowContentEmojis(true);

  };

  const handleLoveIt = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    // Aquí puedes agregar la lógica para enviar el formulario
    setShowForm(false); // Ocultar el formulario después de enviarlo
  };

  return (
    <div className={styles.container}>
      <Nav />
      {!showForm && ( // Ocultar BodyWrapper si showForm es true
        <BodyWrapper
          selectedEmojis={selectedEmojis}
          setSelectedEmojis={setSelectedEmojis}
          handleCreateAccount={handleCreateAccount}
          showButton={showButton}
          setShowButton={setShowButton}
          handleCreateAccountBack={handleCreateAccountBack}
          handleLoveIt={handleLoveIt}
        />
      )}
      {showContentEmojis && (
        <ContentEmojis
          emojis={emojis}
          onEmojiClick={handleEmojiSelection}
          selectedEmojis={selectedEmojis}
        />
      )}   
      {showForm && (
        <Form handleGoBack={handleFormSubmit} selectedEmojis={selectedEmojis} />
      )}
      {/* ... */}
      {showDiscordButton && (
        <button >Iniciar sesión con Discord</button>
      )}
    </div>
  );
}

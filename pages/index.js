
import Nav from "@/components/header/Header";
import BodyWrapper from "@/components/main/BodyWrapper";
import React, { useState, useEffect } from "react"

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
    // Lógica para crear cuenta con emojis seleccionados
  };

  return (
    <>
    <Nav/>
    <BodyWrapper selectedEmojis={selectedEmojis}/>
    </>
  );
}

import ContentEmojis from "@/components/emojis/ContentEmojis";
import Nav from "@/components/header/Header";
import BodyWrapper from "@/components/main/BodyWrapper";
import React, { useState, useEffect } from "react"
import styles from '../public/page.module.css'
import Form from "@/components/form/Form";
import { supabase } from "@/lib/supabaseClient";
import Modal from "@/components/modal/modal";
import LoadingScreen from "@/components/loading/LoadingScreen";
const emojis = [
  {
    category: "Smileys & People",
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
    ]
  }, {
    category: "Animals & Nature",
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
    category: "Food & Activities",
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
      "🍽️",
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
    ]
  }, {
    category: "travel & objects",
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
      "🏠",
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
      "🛢️",
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
      "🧩",
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
const Home = () => {
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [showContentEmojis, setShowContentEmojis] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDiscordButton, setShowDiscordButton] = useState(false);
  const [showModal, setShowModal] = useState(false); // Nuevo estado para el modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para el estado de inicio de sesión
  const [user, setUser] = useState(null); // Nuevo estado para almacenar los datos del usuario
  const [isLoading, setIsLoading] = useState(false);

  function handleEmojiSelection(emoji) {
    if (isLoggedIn) {
      if (selectedEmojis.length < 3) {
        const updatedEmojis = [...selectedEmojis, emoji];
        setSelectedEmojis(updatedEmojis);
        localStorage.setItem('selectedEmojis', JSON.stringify(updatedEmojis));
      }
    } else {
      setShowModal(true);
    }
  }

  

  useEffect(() => {
    const storedEmojis = localStorage.getItem('selectedEmojis');
    if (storedEmojis) {
      setSelectedEmojis(JSON.parse(storedEmojis));
    }
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLoggedIn(true);
        setUser(session.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });
    
  }, []);
  
  
  const handleCreateAccount = () => {
    setIsLoggedIn(true);
    setShowContentEmojis(false);
    setShowButton(false);
    setShowDiscordButton(true);
    setShowModal(false); // Cierra el modal después de iniciar sesión
  };
  

  const handleCreateAccountBack = () => {
    setShowContentEmojis(true);
    setShowDiscordButton(false);
    setShowModal(false); // Cierra el modal si se retrocede
  };

  const handleLoveIt = () => {
    setShowForm(true);
  };
  return (
    <div className={styles.container}  >
     <Nav />
     {isLoading && <LoadingScreen />}
      {!showForm && (
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
        <Form
          handleGoBack={() => setShowForm(false)}
          selectedEmojis={selectedEmojis}
          setShowForm={setShowForm}
          user={user}
          setIsLoading={setIsLoading}
        />
      )}
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          handleCreateAccount={handleCreateAccount}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default Home;

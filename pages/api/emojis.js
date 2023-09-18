import { supabase } from "@/lib/supabaseClient";

export default async (req, res) => {
  const { emojis } = req.query;
  console.log(emojis);

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, emojis, imagen, nombre');

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const emojiArray = Array.from(emojis, (emoji) => emoji);

    const matchedUser = data.find((userData) => {
      // Verificar si la secuencia de 3 emojis está presente en userData.emojis
      for (let i = 0; i <= userData.emojis.length - 3; i++) {
        const emojiSequence = userData.emojis.slice(i, i + 3);
        if (
          emojiSequence.every((emoji, index) => emoji === emojiArray[index])
        ) {
          return true; // Se encontró una coincidencia
        }
      }
      return false; // No se encontró ninguna coincidencia en la secuencia de emojis
    });

    if (matchedUser) {
      // Realiza otras operaciones necesarias aquí, como obtener la imagen del usuario
      return res.status(200).json({ user: matchedUser });
    } else {
      return res.status(404).json({ error: 'No match found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


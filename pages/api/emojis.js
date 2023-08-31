import { supabase } from "@/lib/supabaseClient";
export default async (req, res) => {
  const { emojis } = req.query;

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, emojis, imagen, nombre') // Selecciona solo los campos necesarios

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const emojiArray = Array.from(emojis, (emoji) => emoji);

    const matchedUser = data.find((userData) =>
      emojiArray.every((emoji) => userData.emojis.includes(emoji))
    );

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

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Nav from '@/components/header/Header';
import { FaDiscord } from "react-icons/fa";
import styles from '../public/acount.module.css';

const UserPage = () => {
  const router = useRouter();
  const { emojis } = router.query;
const [user, setUser] = useState({}) 

  const compareEmojis = async () => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('id, emojis');

      if (error) {
        console.error(error);
        return;
      }

      const userEmojis = data;

      const emojiArray = Array.from(emojis, (emoji) => emoji);

      const matchedEmoji = userEmojis.find((userEmoji) =>
        emojiArray.every((emoji) => userEmoji.emojis.includes(emoji))
      );

      if (matchedEmoji) {
        const { id } = matchedEmoji;

        // Llamar a la información del usuario con el ID coincidente
        const { data: userData, error: userError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', id)
          .single();

        if (userError) {
          console.error(userError);
          return;
        }

      setUser(userData)

        console.log('User:', user);
        // Aquí puedes hacer lo que necesites con los datos del usuario
      } else {
        console.log('No match found');
        // Manejar la situación cuando no hay coincidencias
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (emojis) {
      compareEmojis();
    }
  }, [compareEmojis, emojis]);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem('selectedEmojis'); // Elimina el valor almacenado en el localStorage
      router.push('https://web5-iota.vercel.app/');
    } else {
      console.error(error);
    }
  }
  return (
    <>
      <Nav/>
    <div className={styles.container}>
      <h1 className={styles.h1}>hi {user.nombre} this are your web5 account</h1>
      <div>
      <h1 className={styles.h1}>this are your emojis</h1>
      <h1 className={styles.emojis}>{emojis}</h1>
      </div>

      <p className={styles.p}>Come back later for more information</p>

      <button className={styles.logut} onClick={handleLogout}>
          <FaDiscord className={styles.discordIcon} />
          logut
        </button>
    </div>
    </>
  );
};

export default UserPage;


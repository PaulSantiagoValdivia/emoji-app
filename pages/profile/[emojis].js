import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Nav from '@/components/header/Header';
import { FaDiscord } from "react-icons/fa";
import styles from '../../public/acount.module.css';
import LoadingScreen from '@/components/loading/LoadingScreen';

const UserPage = () => {
  const router = useRouter();
  const { emojis } = router.query;
  const [user, setUser] = useState({})
  const [userImage, setUserImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true); // Agregar este estado

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
        const imageName = userData.imagen; // Replace 'imagen' with the correct field name
        console.log(userData);
        if (imageName) {
          const { data: imageData, error: imageError } = await supabase.storage
            .from('profile') // Replace with the correct storage folder name
            .download(`${id}/${imageName}`);
          if (imageError) {
            console.error(imageError);
          } else {
            setUserImage(URL.createObjectURL(imageData));
            setIsLoading(false);
            console.log(isLoading);
          }
        }
      } else {
        console.log('No match found');
        router.push('/')
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
  }, [emojis]);

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
      {isLoading ? (
      <LoadingScreen />
      ):(
        <>
         <Nav />
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          {userImage && (
            <img
            src={userImage}
              alt="User Image"
              className={styles.img}
              />
          )}
        </div>
        
        <div className={styles.infoContainer}>
          <div>
            <h1 className={styles.emojis}>{emojis}</h1>
          </div>
          <h1 className={styles.h1}>{user.nombre}</h1>

          <p className={styles.p}>gm! I am a buildoor and this is my site.</p>
          <button className={styles.logout} onClick={handleLogout}>
            <FaDiscord className={styles.discordIcon} />logout
          </button>
        </div>
      </div>
    </>
  )
}
    </>
  );
};

export default UserPage;


import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Nav from '@/components/header/Header';
import { FaDiscord } from 'react-icons/fa';
import styles from '../../public/acount.module.css';
import LoadingScreen from '@/components/loading/LoadingScreen';

const UserPage = () => {
  const router = useRouter();
  const { emojis } = router.query;
  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

// ...

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/emojis?emojis=${emojis}`);
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);

        if (data.user.imagen) {
          const { data: imageData, error: imageError } = await supabase.storage
            .from('profile')
            .download(`${data.user.id}/${data.user.imagen}`);
          if (imageError) {
            console.error(imageError);
          } else {
            setUserImage(URL.createObjectURL(imageData));
          }
        }
      } else {
        console.log('No match found');
        router.push('/');
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (emojis) {
    fetchData();
  }
}, [emojis]);


  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem('selectedEmojis');
      router.push('https://web5-iota.vercel.app/');
    } else {
      console.error(error);
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Nav />
          <div className={styles.container}>
            <div className={styles.imgContainer}>
              {userImage && (
                <img src={userImage} alt="User Image" className={styles.img} />
              )}
            </div>

            <div className={styles.infoContainer}>
              <div>
                <h1 className={styles.emojis}>{emojis}</h1>
              </div>
              <h1 className={styles.h1}>{user.nombre}</h1>

              <p className={styles.p}>
                gm! I am a buildoor and this is my site.
              </p>
              <button className={styles.logout} onClick={handleLogout}>
                <FaDiscord className={styles.discordIcon} />
                logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserPage;

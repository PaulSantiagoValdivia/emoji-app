import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Nav from '@/components/header/Header';
import { FaDiscord } from 'react-icons/fa';
import styles from '../../public/acount.module.css';
import LoadingScreen from '@/components/loading/LoadingScreen';
import Magiceden from '../../components/svg/Magiceden';
import Twitter from '../../components/svg/Twitter';
import Snapchat from '../../components/svg/Snapchat';
import TikTok from '../../components/svg/TikTok';

const UserPage = () => {
  const router = useRouter();
  const { emojis } = router.query;
  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUncomming, setShowUncomming] = useState(false);
  const [buttonText, setButtonText] = useState({
    twitter: 'Follow me for updates',
    magiceden: 'Like my username? Buy it here',
    snapchat: 'I send stuff here',
    tiktok: 'Not your average tiktok account',
  });
  const handleClick = (buttonId) => {
    setButtonText((prevButtonText) => ({
      ...prevButtonText,
      [buttonId]: 'soon',
    }));

    setShowUncomming(true);

    setTimeout(() => {
      setButtonText((prevButtonText) => ({
        ...prevButtonText,
        [buttonId]: buttonText[buttonId], // Restaurar el texto original
      }));
      setShowUncomming(false);
    }, 1000); // 1000 milisegundos = 1 segundo
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/emojis?emojis=${emojis}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          console.log(data);
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
              <div className={styles.buttonsContainer}>
      <button
        className={styles.buttonApp}
        onClick={() => handleClick('twitter')}
      >
        <span>
          <Twitter /> Twitter
        </span>{' '}
        {buttonText.twitter}
      </button>
      <button
        className={styles.buttonApp}
        onClick={() => handleClick('magiceden')}
      >
        <span>
          <Magiceden /> Magiceden
        </span>{' '}
        {buttonText.magiceden}
      </button>
      <button
        className={styles.buttonApp}
        onClick={() => handleClick('snapchat')}
      >
        <span>
          <Snapchat /> Snapchat
        </span>{' '}
        {buttonText.snapchat}
      </button>
      <button
        className={styles.buttonApp}
        onClick={() => handleClick('tiktok')}
      >
        <span>
          <TikTok /> TikTok
        </span>{' '}
        {buttonText.tiktok}
      </button>
    </div>

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserPage;

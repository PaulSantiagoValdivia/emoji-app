import { IoFlashOutline } from 'react-icons/io5';
import styles from "./header.module.css";

export default function Nav() {

  return (
      <div className={styles.navContainer}>
        <div className={styles.leftContent}>
          <div className={styles.logo}>
          <h1 className={styles.h1}>WEB5</h1>
          <IoFlashOutline className={styles.icon}/>
          
          </div>
          <p className={styles.p}>Share all your socials using emojis and NFTs</p>
        </div>
      </div>
  );
}
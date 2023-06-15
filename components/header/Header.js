import styles from "./header.module.css";
import Logo from "@/assets/Logo";
export default function Nav() {

  return (
    <div className={styles.navContainer}>
        <div className={styles.logo}>
          <h1 className={styles.h1}>WEB5 </h1>
          <Logo className={styles.icon}/>
          <p className={styles.p}>Share all your socials using emojis and NFTs</p>
      </div>
    </div>
  );
}
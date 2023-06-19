import styles from "./header.module.css";
import Logo from "@/assets/Logo";
import { useRouter } from "next/router";
export default function Nav() {
  const router = useRouter();
  return (
    <div className={styles.navContainer}>
        <div className={styles.logo} onClick={() => router.push('https://web5-iota.vercel.app/')}>
          <h1 className={styles.h1}>WEB5 </h1>
          <Logo className={styles.icon}/>
      </div>
          <p className={styles.p}>Share all your socials using emojis and NFTs</p>
    </div>
  );
}
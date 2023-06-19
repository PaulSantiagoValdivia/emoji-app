import React from 'react';
import { useRouter } from 'next/router';
import styles from '../public/404.module.css';
import Nav from '@/components/header/Header';

const NotFoundPage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('https://web5-iota.vercel.app/')
  };

  return (
    <>
      <Nav/>
      <div className={styles.errorContainer}>
        <h1 className={styles.errorHeading}>Error 404 - Page not found</h1>
        <p className={styles.errorMessage}>Sorry, the page you are looking for does not exist.</p>
        <button onClick={handleRedirect} className={styles.redirectButton}>GO TO START</button>
      </div>
    </>
  );
};

export default NotFoundPage;

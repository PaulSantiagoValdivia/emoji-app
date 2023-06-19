import styles from './profile.module.css'
import Image from 'next/image';
import profileImage from '../../assets/profile.png'; // Ajusta la ruta de la imagen según su ubicación relativa

function ProfilePreview() {
  return (
    <div className={styles.previewContainer}>
      <Image src={profileImage} alt="Profile" width={650} height={860} />
    </div>
  );
}

export default ProfilePreview;
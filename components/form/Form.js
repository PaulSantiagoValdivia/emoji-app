import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import styles from './form.module.css';

const Form = ({ handleGoBack, selectedEmojis, user }) => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [nombreError, setNombreError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (nombre.trim() !== '') {
      setNombreError('');
    }
  }, [nombre]);

  useEffect(() => {
    if (descripcion.trim() !== '') {
      setDescripcionError('');
    }
  }, [descripcion]);

  useEffect(() => {
    if (selectedImage !== null) {
      setImageError('');
    }
  }, [selectedImage]);

  const handleContinue = async () => {
    if (step === 1) {
      if (nombre.trim() === '') {
        setNombreError('Please enter your name');
        return;
      }
      if (descripcion.trim() === '') {
        setDescripcionError('Please enter a description');
        return;
      }
      setNombreError('');
      setDescripcionError('');
      setStep(2);
    } else if (step === 2) {
      if (selectedImage === null) {
        setImageError('Please select an image');
        return;
      }
      setImageError('');
      setStep(3);
    } else if (step === 3) {
      // Save user data in the database
      try {
        const { data: file, error: uploadError } = await supabase.storage
          .from('profile')
          .upload(`${user.id}/${selectedImage.name}`, selectedImage);

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          // Handle error, show error message, etc.
        } else {
          const imageUrl = file.publicURL;
          console.log('Image uploaded successfully:', imageUrl);

          // Save user data in the database
          const { data, error } = await supabase.from('usuarios').insert([
            {
              id: user.id,
              email: user.email,
              emojis: selectedEmojis,
              nombre,
              descripcion,
              imagen: imageUrl,
            },
          ]);

          if (error) {
            console.error('Error saving user data:', error);
            // Handle error, show error message, etc.
          } else {
            console.log('User data saved successfully:', data);
            // Redirect to the user's page with selected emojis in the URL
            const emojis =selectedEmojis.join('');
            router.push(`${emojis}`);
          }
        }
      } catch (error) {
        console.error('Error saving user data:', error);
        // Handle error, show error message, etc.
      }
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const imageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className={styles.container}>
      {step === 1 && (
        <div className={styles.formContent}>
          {selectedEmojis.length > 0 && (
            <h1 className={styles.title}>
              Ok, {selectedEmojis.join('')}. LET'S GET TO KNOW EACH OTHER BETTER
            </h1>
          )}
          <p className={styles.label}>What's your name, nickname, etc?</p>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Satoshi Nakamoto"
            className={styles.inputName}
          />
    <p className={styles.label}>Mind adding a description?</p>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
            className={styles.inputDescription}
          ></textarea>
      \    <button className={styles.buttonNext} onClick={handleContinue}>
            {step === 1 ? 'SOUNDS LEGIT!' : 'THAT’S ME!'}
          </button>
          <button className={styles.back} onClick={handleGoBack}>
            MEH, GO BACK
          </button>
        </div>
      )}
      {step === 2 && (
        <>
          {selectedEmojis.length > 0 && (
            <h1 className={styles.title}>
              Ok, {selectedEmojis.join('')}. LET'S GET TO KNOW EACH OTHER BETTER
            </h1>
          )}
          <p className={styles.label}>Let’s add a profile picture</p>
          <label className={styles.labelImage}>
            <input
              type="file"
              onChange={imageSelect}
              className={styles.inputImage}
            />
          </label>
          <button className={styles.buttonNext} onClick={handleContinue}>
            {step === 2 ? 'SOUNDS LEGIT!' : 'THAT’S ME!'}
          </button>
          <button
            className={styles.back}
            onClick={handlePrevious}
            disabled={step === 1}
          >
            MEH, GO BACK
          </button>
        </>
      )}
      {step === 3 && (
        <>
          <button className={styles.buttonDiscord} onClick={handleContinue}>
            Create Account
          </button>
        </>
      )}
    </div>
  );
};

export default Form;

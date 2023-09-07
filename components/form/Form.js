import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import styles from './form.module.css';
const Form = ({ handleGoBack, selectedEmojis, user, setIsLoading }) => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [nombreError, setNombreError] = useState('');
  const [descripcionError, setDescripcionError] = useState('');
  const [imageError, setImageError] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [isImageSelected, setIsImageSelected] = useState(false); // Variable de estado adicional

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
      setIsImageSelected(true); // Actualizar el estado cuando se selecciona una imagen
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
      try {
        const { data: file, error: uploadError } = await supabase.storage
          .from('profile')
          .upload(`${user.id}/${selectedImage.name}`, selectedImage);

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          // Handle error, show error message, etc.
        } else {
          // Save user data in the database
          const { data, error } = await supabase.from('usuarios').insert([
            {
              id: user.id,
              email: user.email,
              emojis: selectedEmojis,
              nombre,
              descripcion,
              imagen: selectedImage.name,
            },
          ]);

          if (error) {
            console.error('Error saving user data:', error);
            // Handle error, show error message, etc.
          } else {
            console.log('User data saved successfully:', data);
            // Redirect to the user's page with selected emojis in the URL
            const emojis = selectedEmojis.join('');
            router.push(`/profile/${emojis}`);
            setIsLoading(true)
          }
        }
      } catch (error) {
        console.error('Error saving user data:', error);
        // Handle error, show error message, etc.
      }
      if (selectedImage === null) {
        setImageError('Please select an image');
        return;
      }
      setImageError('');
    }

  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const imageSelect = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        {step === 1 && (
          <div className={styles.formContent}>
            {selectedEmojis.length > 0 && (
              <h1 className={styles.title}>
                Ok, {selectedEmojis.join('')}. LETS GET TO KNOW EACH OTHER BETTER
              </h1>
            )}
            <p className={styles.label}>Whats your name, nickname, etc?</p>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Satoshi Nakamoto"
              className={styles.inputName}
            />
            {nombreError && <p className={styles.errorMessageName}>{nombreError}</p>}
            <p className={styles.label}>Mind adding a description?</p>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Add a bio here."
              className={styles.inputDescription}
            ></textarea>
            {descripcionError && <p className={styles.errorMessageDescrip}>{descripcionError}</p>}
            <button className={styles.buttonNext} onClick={handleContinue}>
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
                Ok, {selectedEmojis.join('')}. LETS GET TO KNOW EACH OTHER BETTER
              </h1>
            )}
            <p className={styles.label}>Let’s add a profile picture</p>
            <label className={styles.labelImage}
            >
              <input
                type="file"
                onChange={imageSelect}
                className={styles.inputImage}
              />
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className={styles.imagePreview}
                />
              )}
              {isImageSelected ? null : 'upload a picture'}
            </label>
            {imageError && <p className={styles.errorMessageImg}>{imageError}</p>}
            <button className={styles.buttonNext} onClick={handleContinue}>
              {step === 2 ? 'THAT’S ME!' : 'SOUNDS LEGIT!'}
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
      </div>
      <div className={styles.previewContent}>
        <img src='/profile.png' className={styles.profileImg} />
      </div>
    </div>
  );
};

export default Form;

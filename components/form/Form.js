import styles from './form.module.css'
import { useState } from "react";
const Form = ({ handleGoBack, handleFormSubmit, selectedEmojis }) => {
  const [step, setStep] = useState(1);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      const formData = {
        nombre,
        descripcion,
        imagen,
      };
      handleFormSubmit(formData);
    }
  };

  const handlePrevious = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className={styles.container}>
          {selectedEmojis.length > 0 && (
      <h1 className={styles.title}>
        Ok,{selectedEmojis.join('')}LET'S GET TO KNOW EACH OTHER BETTER
      </h1>
        )}
      {step === 1 && (
        <div className={styles.formContent}>
          <p className={styles.label}>
            Whats your name, nickname, etc?
            </p>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Satoshi Nakamoto"
              className={styles.inputName}
            />
          <p className={styles.label}>
          Mind adding a description?
            </p>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
              className={styles.inputDescription }
            ></textarea>
          <button className={styles.buttonNext} onClick={handleContinue}>
        {step === 1 ? 'SOUNDS LEGHT!' : 'THAT’S ME !'}
      </button>    
      <button className={styles.back} onClick={handleGoBack}>
      MEH ,  GO BACK
      </button>
        </div>
      )}
      {step === 2 && (
        <>
        <p className={styles.label}>Let’s add a profile picture</p>
        <label className={styles.labelImage}  >

          <input
            type="file"
            onChange={(e) => setImagen(e.target.value)}
          
            className={styles.inputImage}
            />
            
            </label>
          <button className={styles.buttonNext} onClick={handleContinue}>
          {step === 1 ? 'SOUNDS LEGHT!' : 'THAT’S ME !'}
      </button>
          <button className={styles.back} onClick={handlePrevious} disabled={step === 1}>
          MEH ,  GO BACK
          </button>
      
        </>
      )}  
    </div>
  );
};

export default Form;

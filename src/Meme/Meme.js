//Librerias
import React, { useEffect, useState } from "react";
import styles from './styles.module.css';
import { useHistory } from 'react-router-dom';

export const Meme = () => {

    const [memes, setMemes] = useState([]);
    const [memeIndex, setMemeIndex] = useState(0);
    const [captions, setCaptions] = useState([]);

    const history = useHistory();

    const updateCaption = (e, index) => {
        const text = e.target.value || '';
        setCaptions(
            captions.map((c, i) => {
                if(index === i) {
                    return text;
                } else {
                    return c;
                }
            })
        );
    };
    

    const generarMeme = () => {
        const currentMeme = memes[memeIndex];
        const formData = new FormData();
    
        //Credenciales para el acceso
        formData.append('username', 'juan_andres2314');
        formData.append('password', 'juan2314');
        formData.append('template_id', currentMeme.id);
        captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));
    
        fetch('https://api.imgflip.com/caption_image', {
          method: 'POST',
          body: formData
        }).then(res => {
          res.json().then(res => {
            history.push(`/generated?url=${res.data.url}`);
          });
        });
      };

    const randomMemes = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * i);
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      };

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(res => {
            res.json().then(res => {
                const _memes = res.data.memes;
                randomMemes(_memes);
                setMemes(_memes);
            });
        });
    }, []);

    useEffect(() => {
        if(memes.length) {
            setCaptions(Array(memes[memeIndex].box_count).fill(''));
        }
    }, [memeIndex, memes]);

    return(
        memes.length ? 
        <div className={styles.container}>
            
            <button onClick={() => setMemeIndex(memeIndex + 1)} className={styles.saltar}>Siguiente Meme</button>
            
            <img src={memes[memeIndex].url} />

            <center>
            <h3>Ingresa el texto para el meme</h3>
            </center>           

            {
                captions.map((c, index) => (
                    <input onChange={(e) => updateCaption(e, index)} key={index} />
                ))
            }
            <button onClick={generarMeme} className={styles.generar}>Generar Meme</button>

        </div> : 
        <></>
    );
};
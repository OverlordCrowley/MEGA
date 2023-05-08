import React, {useEffect, useState} from 'react';
import classes from "./Details.module.sass"
import buttons from "../UI/buttons.module.sass"
import person from '../../images/user.svg'
import axios from "axios";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../../hooks/use-localstorage";
import i18n from '../../i18n';

import {useNavigate} from "react-router-dom";
const DetailsBlock = (props) => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    let [edit, setEdit] = useState(false);
    let [user, setUser] = useState(props.user)
    let navigate = useNavigate();
    useEffect(()=>{
        setUser(props.user)
    }, [props.user])

    const imageData = props.user['img'];
    const dataStartIndex = imageData.indexOf(',') + 1;
    const base64ImageData = imageData.substring(dataStartIndex);
    const decodedImageData = atob(base64ImageData);
    const imageDataArray = new Uint8Array(decodedImageData.length);
    for (let i = 0; i < decodedImageData.length; i++) {
        imageDataArray[i] = decodedImageData.charCodeAt(i);
    }
    const blob = new Blob([imageDataArray], { type: 'image/jpeg' });

    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const objectUrl = URL.createObjectURL(blob);
        setImageSrc(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, []);
    return (
        <div className={classes.mainBlock}>
            <div className={classes.mainInfo}>
                <img src={imageSrc} className={classes['mainInfo__img']}/>
                <p className={classes['mainInfo__text']}>{user.userName}</p>
            </div>
                <div className={classes.infoItem}>
                    <p className={classes.title}>{t('DateCreated')} <span className={classes.subtitle}>{user.dateCreated}</span><input className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='text' /></p>
                </div>
          <div className={classes.btnContainer}>

              <button className={buttons['green-btn'] + ' ' + classes.editBtn + ' ' + classes.red} onClick={(e)=>{setEdit(false);
                  axios.post('http://localhost:8080/profile/delete', {
                      pass: user['pass'],
                      email: user['email'],

                  })
                      .then(function (response) {
                          if(response.data) {
                                alert(t('UserDel'))
                                sessionStorage.clear()
                                navigate('/');
                          }

                          else {
                              alert(t('RepeatPass'))

                          }})
                      .catch(function (error) {

                      });
              }}>{t('DelBtn')}</button>

          </div>
        </div>
    );
};

export default DetailsBlock;
import React, {useContext, useEffect, useState} from 'react';
import classes from "./PersonBlock.module.sass";
import "./PersonBlock.css";
import buttons from "../UI/buttons.module.sass";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {FileUploader} from 'react-drag-drop-files';
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../../hooks/use-localstorage";
import i18n from '../../i18n';
import Dropzone from 'react-dropzone';
import Context from "../Context/Context";

const PersonBlock = (props) => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    let [edit, setEdit] = useState(false);
    let [user, setUser] = useState(props.user)
    useEffect(()=>{
        setUser(props.user)
    },[props.user])


    let [firstName, setFirstName] = useState('');
    let [secondName, setSecondName] = useState('');
    let [username, setUsername] = useState('');
    let [lastName, setLastName] = useState('');
    let [date, setDate] = useState('');
    // let [age, setAge] = useState(18);
    let [img, setImg] = useState({});


    let [firstNameError, setFirstNameError] = useState(t('FNameErr'));
    let [secondNameError, setSecondNameError] = useState(t('SNameErr'));
    let [lastNameError, setLastNameError] = useState(t('LNameErr'));
    let [usernameError, setUsernameError] = useState(t('UNameErr'));
    // let [ageError, setAgeError] = useState(t('AgeErr'));


    let [firstNameDirty, setFirstNameDirty] = useState(false);
    let [secondNameDirty, setSecondNameDirty] = useState(false);
    let [lastNameDirty, setLastNameDirty] = useState(false);
    // let [ageDirty, setUAgeDirty] = useState(false);
    let [usernameDirty, setUsernameDirty] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(()=>{
        if(!firstNameError && !secondNameError && !lastNameError && !usernameError){
            setFormValid(true);
        }
        else{
            setFormValid(false);
        }
    }, [firstNameError, secondNameError, lastNameError, usernameError])


    const usernameHandler = (e) =>{
        setUsername(e.target.value)
        if(e.target.value.length < 5){
            setUsernameError(t('O1'))
        }
        else if(e.target.value.length > 55)
            setUsernameError(t('O2'))
        else{
            setUsernameError("");
        }
    }
    let navigate = useNavigate();
    const firstNameHandler = (e) =>{
        setFirstName(e.target.value)
        let regex = /^([А-Я]{1}[а-яё]{1,25}|[A-Z]{1}[a-z]{2,25})$/;
        if (regex.test(e.target.value) && e.target.value.length >= 2 && e.target.value.length <= 25) {
            setFirstNameError("");
        }

        else{
            setFirstNameError(t('O3'));
        }
    }
    const secondNameHandler = (e) =>{
        setSecondName(e.target.value)
        let regex = /^([А-Я]{1}[а-яё]{1,25}|[A-Z]{1}[a-z]{2,25})$/;
        if (regex.test(e.target.value) && e.target.value.length >= 2 && e.target.value.length <= 25) {
            setSecondNameError("");
        }

        else{
            setSecondNameError(t('O4'));
        }
    }
    const lastNameHandler = (e) =>{
        setLastName(e.target.value)
        let regex = /^([А-Я]{1}[а-яё]{1,25}|[A-Z]{1}[a-z]{2,25})$/;
        if (regex.test(e.target.value) && e.target.value.length >= 2 && e.target.value.length <= 25) {
            setLastNameError("");
        }

        else{
            setLastNameError(t('O5'));
        }
    }
    // const ageHandler = (e) =>{
    //     setAge(Number(e.target.value))
    //     if((Number(e.target.value) <= 100) && (Number(e.target.value) >= 18)){
    //         setAgeError('');
    //     }
    //
    //     else{
    //         setAgeError(t('O6'));
    //     }
    // }
    const dateHandler = (e) =>{
        setDate(e.target.value)

    }


    const blurHandler = (e) => {
        switch (e.target.name){
            case 'secondname':
                setSecondNameDirty(true);
                break;
            case 'username':
                setUsernameDirty(true);
                break;
            case 'firstname':
                setFirstNameDirty(true);
                break;
            case 'lastname':
                setLastNameDirty(true);
                break;
            // case 'age':
            //     setUAgeDirty(true);
            //     break;


        }
    }

    function delFunc (){
        setEdit(false);
        setFirstNameDirty(false);
        setSecondNameDirty(false);
        setLastNameDirty(false);
        setUsernameDirty(false);
        // setUAgeDirty(false);

    }

    let {isActive, setIsActive} = useContext(Context);



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




    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileDrop = (event) => {
        event.preventDefault();
        setSelectedFile(event.dataTransfer.files[0]);


    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileLoad = (e) => {
        e.preventDefault();
        setSelectedFile({
            file: e.target.files[0],
            content: e.target.result,
        });
    };






    return (
        <form onSubmit={(e)=>{e.preventDefault()}} className={classes.mainBlock} encType='multipart/form-data'>
            <div className={classes.mainInfo}>
                <img src={imageSrc} className={classes['mainInfo__img']}/>
                <p className={classes['mainInfo__text']}>{user['userName'] === null ? '' : user['userName']}</p>
            </div>


                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                <p className={classes.title + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>{t('UName')} <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['userName'] === null ? '' : user['userName']}</span><input
                    name='username'
                    maxLength='23'
                    minLength='2'
                    className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='text' onBlur={e => blurHandler(e)}   onChange={e => usernameHandler(e)} /></p>
                    {(usernameDirty && usernameError) && <div style={{color:"red"}}>{usernameError}</div>}
            </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>{t('FName')} <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['firstName'] !== null ? user['firstName'] : ''}</span><input
                        onBlur={e => blurHandler(e)}   onChange={e => firstNameHandler(e)}
                        name='firstname'
                        maxLength='23'
                        minLength='2'
                        className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='text' /></p>
                    {(firstNameDirty && firstNameError) && <div style={{color:"red"}}>{firstNameError}</div>}
                </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>{t('SName')} <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['secondName'] !== null ? user['secondName'] : ''}</span><input
                        onBlur={e => blurHandler(e)}   onChange={e => secondNameHandler(e)}
                        name='secondname'
                        maxLength='23'
                        minLength='2'
                        className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='text' /></p>
                    {(secondNameDirty && secondNameError) && <div style={{color:"red"}}>{secondNameError}</div>}
                </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>{t('Lname')} <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['middle_name']!== null ? user['middle_name'] : ''}</span><input
                        onBlur={e => blurHandler(e)}   onChange={e => lastNameHandler(e)}
                        name='lastname'
                        maxLength='23'
                        minLength='2'
                        className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='text' /></p>
                    {(lastNameDirty && lastNameError) && <div style={{color:"red"}}>{lastNameError}</div>}
                </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>{t('DB')} <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['birthday'] !== null ? user['birthday'] : ''}</span><input
                        onBlur={e => blurHandler(e)}   onChange={e => dateHandler(e)}
                        name='date'

                        className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='date' /></p>

                </div>
                {/*<div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>*/}
                {/*    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>{t('Ages')} <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>*/}
                {/*        {user['age'] !== null ? user['age'] : ''}</span><input*/}
                {/*        onBlur={e => blurHandler(e)}   onChange={e => ageHandler(e)}*/}
                {/*        name='age'*/}
                {/*        minLength='2'*/}
                {/*        maxLength='3'*/}
                {/*     className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type=   'text' /></p>*/}
                {/*    {(ageDirty && ageError) && <div style={{color:"red"}}>{ageError}</div>}*/}
                {/*</div>*/}

            { edit ? (     <>

                {/*<div*/}
                {/*    onDrop={handleFileDrop}*/}
                {/*    onDragOver={handleDragOver}*/}
                {/*    style={{ border: "1px solid black", height: "200px" }}*/}
                {/*>*/}
                {/*    <p>Drag and drop a file here</p>*/}
                {/*    {selectedFile && <p>Selected file: {selectedFile.name}</p>}*/}
                {/*</div>*/}


                <FileUploader
                    accept=".png, .jpg"
                    name="file"
                    onDrop={(file) => setSelectedFile(file)}
                />

            </>) : ''}



          <div className={classes.btnContainer}>
              <button className={buttons['green-btn'] + ' ' + classes.editBtn + ' ' + (edit ? classes.red : '')} onClick={(e)=>{edit ? delFunc() : setEdit(true)}}>{edit ? t('Canc') : t('Ed')}</button>
              <button disabled={!formValid} className={buttons['border-button'] + ' ' + classes.editBtn + ' ' + (edit ? classes.editV: classes.editH)} onClick={(e)=>{setEdit(false);



                  const formData = new FormData();
                  formData.append("file", selectedFile);
                  formData.append("userName", user['userName']);
                  formData.append("userNameModified", username);
                  formData.append("firstName", firstName);
                  formData.append("secondName", secondName);
                  formData.append("lastName", lastName);
                  formData.append("birthday", date);
                  


                     axios.post('http://localhost:8080/profile/person',
                         formData
                     , { headers: {
                             'Content-Type': 'multipart/form-data'
                         }})
                         .then(function (response) {
                             if(response.data) {
                                 let obj = user;
                                 obj['userName'] = username;
                                 obj['firstName'] = firstName;
                                 obj['secondName'] = secondName;
                                 obj['middle_name'] = lastName;
                                 obj['birthday'] = date;
                                 obj['image'] = formData['file'];

                                 sessionStorage.setItem('user', JSON.stringify(obj));
                                 console.log(sessionStorage.getItem('user'));
                             }

                             else {
                                 alert(t('LogOrPass'))

                             }})
                         .catch(function (error) {

                         })

              }}>{t('Save')}</button>

          </div>
        </form>
    );
};

export default PersonBlock;
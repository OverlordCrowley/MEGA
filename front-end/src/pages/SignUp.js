import React, {useEffect, useState} from 'react';
import classes from "./signUp.module.sass";
import buttons from "../Components/UI/buttons.module.sass";
import axios from "axios";
import InputMask from "react-input-mask";
import {log10} from "chart.js/helpers";
import {useNavigate} from "react-router-dom";
const SignUp = () => {
    let [email, setEmail] = useState('');
    let [tel, setTel] = useState('');
    let [username, setUsername] = useState('');
    let [pass, setPass] = useState('');
    let [pass2, setPass2] = useState('');
    let navigate = useNavigate();
    setInterval(()=>{
        let data = sessionStorage.getItem('user')
        if(data){
            navigate('/profile/person')
        }
    }, 1000)
    let [emailError, setEmailError] = useState('Email не может быть пустым');
    let [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    let [telError, setTelError] = useState('Телефон не может быть пустым');
    let [repeatError, SetRepeatError] = useState('Повторный пароль не может быть пустым');
    let [usernameError, setUsernameError] = useState('Username не может быть пустым');

    let [emailDirty, setEmailDirty] = useState(false);
    let [passwordDirty, setPasswordDirty] = useState(false);
    let [telDirty, setTelDirty] = useState(false);
    let [repeatDirty, SetRepeatDirty] = useState(false);
    let [usernameDirty, setUsernameDirty] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(()=>{
        if(!emailError && !passwordError && !telError && !repeatError && !usernameError){
            setFormValid(true);
        }
        else{
            setFormValid(false);
        }
    }, [emailError, passwordError, telError, repeatError, usernameError])

    const emailHandler = (e) =>{
        setEmail(e.target.value)
        let re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Некорректный email');
        }
        else{
            setEmailError("");
        }
    }

    const telHandler = (e) =>{
        let i = e.target.value.replace("(",'').replace(")",'').replace(' ', '');
        setTel(i);
        let last = e.target.value.slice(-1);
        if (last === "_") {
            setTelError("Некорректный номер телефона");
        } else {
            setTelError("");
        }
    }

    const usernameHandler = (e) =>{
        setUsername(e.target.value)
        if(e.target.value.length < 5){
            setUsernameError('Имя пользователя должно быть длиннее 5')
        }
        else if(e.target.value.length > 55)
            setUsernameError('Имя пользователя должно быть меньше 55')
        else if(!e.target.value)
            setUsernameError('Имя пользователя должно быть меньше 55')
        else{
            setUsernameError("");
        }
    }

    const passwordHandler = (e) =>{
        setPass(e.target.value)
        let PassRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)(?!^[!@#$%^&*+-]*$)^([a-zA-Z0-9!@#$%^&*+-]{12,25})$/;
    //
        console.log(PassRegex.test(e.target.value) && e.target.value.length >= 12 && e.target.value.length <= 25)
        if (PassRegex.test(e.target.value) && e.target.value.length >= 12 && e.target.value.length <= 25) {
            setPasswordError("");
        } else {
            setPasswordError("Пароль должен содержать: минимум 12 и максимум 25 символов, или одну заглавную букву, одна строчная буква, или одна цифра или один специальный символ");
        }

    }



    const repeatHandler = (e) =>{
        setPass2(e.target.value)
        if(e.target.value === pass){
            SetRepeatError("");
        }
        else{
            SetRepeatError("Пароли отличаются");
        }
    }


    // axios.get('http://localhost:3000/sign/data', {
    //     // params: {
    //     //     id: 123,
    //     //     name: 'John Doe'
    //     // }
    // })
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });

    const blurHandler = (e) => {
        switch (e.target.name){
            case 'email':
                setEmailDirty(true);
                break;
            case 'username':
                setUsernameDirty(true);
                break;
            case 'tel':
                setTelDirty(true);
                break;
            case 'pass':
                setPasswordDirty(true);
                break;
            case 'repeatpass':
                SetRepeatDirty(true);
                break;

        }
    }



    return (

       <div className={classes.container + ' ' + classes.smallContainer}>
           <form>
               <p className={classes.title}>Регистрация</p>
                   <div className={classes.formBlock}>
                       <label className={classes.subtitle}>Email</label>
                       <input type="text" onBlur={e => blurHandler(e)} name='email' onChange={e => emailHandler(e)} className={classes.inputs} minLength='5' maxLength='55'/>
                       {(emailDirty && emailError) && <div style={{color:"red"}}>{emailError}</div>}
                   </div>
               <div className={classes.formBlock}>
                   <label className={classes.subtitle}>Логин</label>
                   <input type="text" onBlur={e => blurHandler(e)} name='username' onChange={e => usernameHandler(e)} className={classes.inputs} minLength='5' maxLength='55'/>
                   {(usernameDirty && usernameError) && <div style={{color:"red"}}>{usernameError}</div>}
               </div>
               <div className={classes.formBlock}>
                   <label className={classes.subtitle}>Телефон</label>
                   <InputMask mask="+7 (999) 999 99 99" value={tel} type="tel" onBlur={e => blurHandler(e)} name='tel' onChange={e => telHandler(e)} className={classes.inputs}/>
                   {(telDirty && telError) && <div style={{color:"red"}}>{telError}</div>}
               </div>
               <div className={classes.formBlock}>
                   <label className={classes.subtitle}>Пароль</label>
                   <input type="password" onBlur={e => blurHandler(e)} name='pass' onChange={e => passwordHandler(e)} className={classes.inputs} minLength='8' maxLength='25'/>
                   {(passwordDirty && passwordError) && <div style={{color:"red"}}>{passwordError}</div>}
               </div>
               <div className={classes.formBlock}>
                   <label className={classes.subtitle}>Повторите пароль</label>
                   <input type="password" onBlur={e => blurHandler(e)} name='repeatpass' onChange={e => repeatHandler(e)} className={classes.inputs} minLength='8' maxLength='25'/>
                   {(repeatDirty && repeatError) && <div style={{color:"red"}}>{repeatError}</div>}
               </div>
               <button disabled={!formValid}
                       onClick={
                           (e)=>{
                               e.preventDefault()
                               axios.post('http://localhost:8080/signup', {
                                   email: email,
                                   userName: username,
                                   pass: pass,
                                   phone: tel,
                               })
                                   .then(function (response) {
                                       if(!response.data){
                                           alert('Такой пользователь существует')
                                       }
                                       else{
                                           alert('Вы успешно зарегистрировались')
                                       }
                                   })
                                   .catch(function (error) {

                                   });
                           }
                       }
               className={buttons['border-button'] + ' ' + classes.btn}>Зарегистрироваться</button>
           </form>
       </div>

    );
};
export default SignUp;
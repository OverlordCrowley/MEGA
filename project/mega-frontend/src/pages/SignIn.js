import React, {useEffect, useState} from 'react';
import classes from "./signIn.module.sass";
import buttons from "../Components/UI/buttons.module.sass";
import axios from "axios";
import {Redirect, useNavigate} from "react-router-dom";
import ProfilePage from "./ProfilePage";

const SignIn = (props) => {
    let navigate = useNavigate();

    let [email, setEmail] = useState('');
    let [pass, setPass] = useState('');

    let [emailError, setEmailError] = useState('Email не может быть пустым');
    let [passwordError, setPasswordError] = useState('Пароль не может быть пустым');

    let [emailDirty, setEmailDirty] = useState(false);
    let [passwordDirty, setPasswordDirty] = useState(false);

    const [formValid, setFormValid] = useState(false);

    let [user, setUser] = useState({});

    let data = sessionStorage.getItem('user')
    if (data) {
        navigate('/profile/person');
    }

    useEffect(() => {
        if (!emailError && !passwordError) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        let re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный email');
        } else {
            setEmailError("");
        }
    }

    const passwordHandler = (e) => {
        setPass(e.target.value)

        if (e.target.value.length >= 12 && e.target.value.length <= 25) {
            setPasswordError("");
        } else {
            setPasswordError("Пароль должен содержать: минимум 12 и максимум 25 символов");
        }

    }
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true);
                break;
            case 'pass':
                setPasswordDirty(true);
                break;
        }
    }

    let [sta, setsta] = useState()
    return (

        <div className={classes.container + ' ' + classes.smallContainer}>
            <form>
                <p className={classes.title}>Вход</p>
                <div className={classes.formBlock}>
                    <label className={classes.subtitle}>Email</label>
                    <input type="text" onBlur={e => blurHandler(e)} name='email' onChange={e => emailHandler(e)}
                           name='email' className={classes.inputs}/>
                    {(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}
                </div>
                <div className={classes.formBlock}>
                    <label className={classes.subtitle}>Password</label>
                    <input type="password" onBlur={e => blurHandler(e)} name='pass' onChange={e => passwordHandler(e)}
                           name='pass' className={classes.inputs}/>
                    {(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
                </div>
                <button disabled={!formValid} onClick={
                    (e) => {
                        e.preventDefault()
                        axios.post('http://localhost:8080/signin', {
                            email: email,
                            pass: pass,
                        })
                            .then(function (response) {
                                console.log(response.data)
                                if (response.data['id'] !== null) {

                                    let obj = response.data;
                                    sessionStorage.setItem('user', JSON.stringify(obj));

                                    navigate('/profile/person');
                                } else {
                                    alert('Неверный логин или пароль ')

                                }
                            })
                            .catch(function (error) {

                            });

                    }
                } className={buttons['border-button'] + ' ' + classes.btn}>Войти
                </button>
            </form>
        </div>

    );
};
export default SignIn;
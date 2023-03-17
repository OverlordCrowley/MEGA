import React, {useEffect, useState} from 'react';
import classes from "./PrivateBlock.module.sass"
import buttons from "../UI/buttons.module.sass"
import person from '../../images/user.svg'
import axios from "axios";
const PrivateBlock = (props) => {
    let [user, setUser] = useState(props.user)
    // useEffect(()=>{
    //     let obj = props.user;
    //     setUser(obj)
    // },[props.user]);
    let [edit, setEdit] = useState(false);

    let [newpass, setNewpass] = useState('');
    let [curpass, setCurpass] = useState('');
    let [repeatpass, setRepeatpass] = useState('');



    let [newpassError, setNewpassError] = useState('Поле с паролем не может быть пустым');
    let [curpassError, setCurpassError] = useState('Поле с паролем не может быть пустым');
    let [repeatpassError, setRepeatpassError] = useState('Поле с паролем не может быть пустым');


    let [newpassDirty, setNewpassDirty] = useState(false);
    let [curpassDirty, setCurpassDirty] = useState(false);
    let [repeatpassDirty, setRepeatpassDirty] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(()=>{
        if(!newpassError && !curpassError && !repeatpassError){
            setFormValid(true);
        }
        else{
            setFormValid(false);
        }
    }, [newpassError, curpassError, repeatpassError])

    const curpassHandler = (e) =>{
        setCurpass(e.target.value)
        let PassRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)(?!^[!@#$%^&*+-]*$)^([a-zA-Z0-9!@#$%^&*+-]{12,25})$/;
        //
        if (PassRegex.test(e.target.value) && e.target.value.length >= 12 && e.target.value.length <= 25) {
            setCurpassError("");
        } else {
            setCurpassError("Пароль должен содержать: минимум 12 и максимум 25 символов, или одну заглавную букву, одна строчная буква, или одна цифра или один специальный символ");
        }

    }

    const repeatHandler = (e) =>{
        setRepeatpass(e.target.value)
        if (e.target.value === newpass) {
            setRepeatpassError("");
        } else {
            setRepeatpassError("Пароли должны совпадать");
        }
    }

    const newpassHandler = (e) =>{
        setNewpass(e.target.value)
        let PassRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)(?!^[!@#$%^&*+-]*$)^([a-zA-Z0-9!@#$%^&*+-]{12,25})$/;
        if (PassRegex.test(e.target.value) && e.target.value.length >= 12 && e.target.value.length <= 25) {
            setNewpassError("");
        } else {
            setNewpassError("Пароль должен содержать: минимум 12 и максимум 25 символов, или одну заглавную букву, одна строчная буква, или одна цифра или один специальный символ");
        }



    }




    const blurHandler = (e) => {
        switch (e.target.name){
            case 'newpass':
                setNewpassDirty(true);
                break;
            case 'curpass':
                setCurpassDirty(true);
                break;
            case 'repeatpass':
                setRepeatpassDirty(true);
                break;

        }
    }

    function delFunc (){
        setEdit(false);
        setRepeatpassDirty(false);
        setCurpassDirty(false);
        setNewpassError(false);
    }



    return (
        <div className={classes.mainBlock}>
            <div className={classes.mainInfo}>
                <img src={person} className={classes['mainInfo__img']}/>
                {/*<p className={classes['mainInfo__text']}>{props.user['userName']}</p>*/}
            </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>Текущий пароль: <input
                    onBlur={e => blurHandler(e)}   onChange={e => curpassHandler(e)}
                    name='curpass'
                    minLength='12'
                    maxLength='25'
                    className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='password' /></p>
                    {(curpassDirty && curpassError) && <div style={{color:"red"}}>{curpassError}</div>}
                </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>Новый пароль:
                       <input
                           onBlur={e => blurHandler(e)}   onChange={e => newpassHandler(e)}
                           name='newpass'
                           minLength='12'
                           maxLength='25'
                        className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='password' /></p>
                    {(newpassDirty && newpassError) && <div style={{color:"red"}}>{newpassError}</div>}
                </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>Повторите новый пароль: <input
                        onBlur={e => blurHandler(e)}   onChange={e => repeatHandler(e)}
                        name='repeatpass'
                        minLength='12'
                        maxLength='25'
                        className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='password' /></p>
                    {(repeatpassDirty && repeatpassError) && <div style={{color:"red"}}>{repeatpassError}</div>}
                </div>
          <div className={classes.btnContainer}>
              <button className={buttons['green-btn'] + ' ' + classes.editBtn + ' ' + (edit ? classes.red : '')} onClick={(e)=>{edit ? delFunc() : setEdit(true)}}>{edit ? 'Отменить' : 'Изменить'}</button>
              <button disabled={!formValid} className={buttons['border-button'] + ' ' + classes.editBtn + ' ' + (edit ? classes.editV: classes.editH)} onClick={(e)=>{setEdit(false);
                  axios.post('http://localhost:8080/profile/private', {
                      pass: user['pass'],
                      newPass: newpass,
                      email: user['email'],
                  })
                      .then(function (response) {
                          if(response.data) {
                              let obj = user;
                              obj['pass'] = newpass;

                              sessionStorage.setItem('user', JSON.stringify(obj));

                          }

                          else {

                          }})
                      .catch(function (error) {

                      });
              }}>сохранить изменения</button>

          </div>
        </div>
    );
};

export default PrivateBlock;
import React, {useEffect, useState} from 'react';
import classes from "./PersonBlock.module.sass"
import buttons from "../UI/buttons.module.sass"
import person from '../../images/user.svg'
import axios from "axios";
import {useNavigate} from "react-router-dom";

const PersonBlock = (props) => {
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
    let [age, setAge] = useState(18);



    let [firstNameError, setFirstNameError] = useState('Поле фамилия не может быть пустым');
    let [secondNameError, setSecondNameError] = useState('Пароль не может быть пустым');
    let [lastNameError, setLastNameError] = useState('Телефон не может быть пустым');
    let [usernameError, setUsernameError] = useState('Username не может быть пустым');
    let [ageError, setAgeError] = useState('Поле с возрастом не может быть пустым');


    let [firstNameDirty, setFirstNameDirty] = useState(false);
    let [secondNameDirty, setSecondNameDirty] = useState(false);
    let [lastNameDirty, setLastNameDirty] = useState(false);
    let [ageDirty, setUAgeDirty] = useState(false);
    let [usernameDirty, setUsernameDirty] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(()=>{
        if(!firstNameError && !secondNameError && !lastNameError && !usernameError && !ageError){
            setFormValid(true);
        }
        else{
            setFormValid(false);
        }
    }, [firstNameError, secondNameError, lastNameError, usernameError, ageError])

    const usernameHandler = (e) =>{
        setUsername(e.target.value)
        if(e.target.value.length < 5){
            setUsernameError('Имя пользователя должно быть длиннее 5')
        }
        else if(e.target.value.length > 55)
            setUsernameError('Имя пользователя должно быть меньше 55')
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
            setFirstNameError("Фамилия должна быть длинее 2 и меньше 25 символов");
        }
    }
    const secondNameHandler = (e) =>{
        setSecondName(e.target.value)
        let regex = /^([А-Я]{1}[а-яё]{1,25}|[A-Z]{1}[a-z]{2,25})$/;
        if (regex.test(e.target.value) && e.target.value.length >= 2 && e.target.value.length <= 25) {
            setSecondNameError("");
        }

        else{
            setSecondNameError("Имя должно быть длинее 2 и меньше 25 символов");
        }
    }
    const lastNameHandler = (e) =>{
        setLastName(e.target.value)
        let regex = /^([А-Я]{1}[а-яё]{1,25}|[A-Z]{1}[a-z]{2,25})$/;
        if (regex.test(e.target.value) && e.target.value.length >= 2 && e.target.value.length <= 25) {
            setLastNameError("");
        }

        else{
            setLastNameError("Отчество должно быть длинее 2 и меньше 25 символов");
        }
    }
    const ageHandler = (e) =>{
        setAge(Number(e.target.value))
        if((Number(e.target.value) <= 100) && (Number(e.target.value) >= 18)){
            setAgeError('');
        }

        else{
            setAgeError('Год рождения должен быть с 18 до 100');
        }
    }
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
            case 'age':
                setUAgeDirty(true);
                break;


        }
    }

    function delFunc (){
        setEdit(false);
        setFirstNameDirty(false);
        setSecondNameDirty(false);
        setLastNameDirty(false);
        setUsernameDirty(false);
        setUAgeDirty(false);

    }
    return (
        <div className={classes.mainBlock}>
            <div className={classes.mainInfo}>
                <img src={person} className={classes['mainInfo__img']}/>
                <p className={classes['mainInfo__text']}>{user['userName'] === null ? '' : user['userName']}</p>
            </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                <p className={classes.title + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>Имя пользователя: <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['userName'] === null ? '' : user['userName']}</span><input
                    name='username'
                    maxLength='23'
                    minLength='2'
                    className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='text' onBlur={e => blurHandler(e)}   onChange={e => usernameHandler(e)} /></p>
                    {(usernameDirty && usernameError) && <div style={{color:"red"}}>{usernameError}</div>}
            </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>Фамилия: <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['firstName'] !== null ? user['firstName'] : ''}</span><input
                        onBlur={e => blurHandler(e)}   onChange={e => firstNameHandler(e)}
                        name='firstname'
                        maxLength='23'
                        minLength='2'
                        className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='text' /></p>
                    {(firstNameDirty && firstNameError) && <div style={{color:"red"}}>{firstNameError}</div>}
                </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>Имя: <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['secondName'] !== null ? user['secondName'] : ''}</span><input
                        onBlur={e => blurHandler(e)}   onChange={e => secondNameHandler(e)}
                        name='secondname'
                        maxLength='23'
                        minLength='2'
                        className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='text' /></p>
                    {(secondNameDirty && secondNameError) && <div style={{color:"red"}}>{secondNameError}</div>}
                </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>Отчество: <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['middle_name']!== null ? user['middle_name'] : ''}</span><input
                        onBlur={e => blurHandler(e)}   onChange={e => lastNameHandler(e)}
                        name='lastname'
                        maxLength='23'
                        minLength='2'
                        className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='text' /></p>
                    {(lastNameDirty && lastNameError) && <div style={{color:"red"}}>{lastNameError}</div>}
                </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>Дата рождения: <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['birthday'] !== null ? user['birthday'] : ''}</span><input
                        onBlur={e => blurHandler(e)}   onChange={e => dateHandler(e)}
                        name='date'

                        className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='date' /></p>

                </div>
                <div className={classes.infoItem + ' ' + (edit ? classes.infoItemActive : '')}>
                    <p className={classes.title  + ' ' + (edit ? classes.infoItemActive : classes.inactive)}>Ваш возраст: <span className={classes.subtitle + ' ' + (edit ? classes.subtitleh : '')}>
                        {user['age'] !== null ? user['age'] : ''}</span><input
                        onBlur={e => blurHandler(e)}   onChange={e => ageHandler(e)}
                        name='age'
                        minLength='2'
                        maxLength='3'
                     className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type=   'text' /></p>
                    {(ageDirty && ageError) && <div style={{color:"red"}}>{ageError}</div>}
                </div>
          <div className={classes.btnContainer}>
              <button className={buttons['green-btn'] + ' ' + classes.editBtn + ' ' + (edit ? classes.red : '')} onClick={(e)=>{edit ? delFunc() : setEdit(true)}}>{edit ? 'Отменить' : 'Изменить'}</button>
              <button disabled={!formValid} className={buttons['border-button'] + ' ' + classes.editBtn + ' ' + (edit ? classes.editV: classes.editH)} onClick={(e)=>{setEdit(false);
                  axios.post('http://localhost:8080/profile/person', {
                      userName: user['userName'],
                      userNameModified: username,
                      firstName: firstName,
                      secondName: secondName,
                      lastName: lastName,
                      age: age,
                      birthday: date,
                  })
                      .then(function (response) {
                          if(response.data) {
                              let obj = user;

                              obj['userName'] = username;
                              obj['firstName'] = firstName;
                              obj['secondName'] = secondName;
                              obj['lastName'] = lastName;
                              obj['age'] = age;
                              obj['birthday'] = date;
                              sessionStorage.setItem('user', JSON.stringify(obj));

                          }

                          else {
                              alert('Неверный логин или пароль ')

                          }})
                      .catch(function (error) {

                      });
              }}>сохранить изменения</button>

          </div>
        </div>
    );
};

export default PersonBlock;
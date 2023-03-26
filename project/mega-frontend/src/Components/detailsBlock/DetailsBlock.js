import React, {useEffect, useState} from 'react';
import classes from "./Details.module.sass"
import buttons from "../UI/buttons.module.sass"
import person from '../../images/user.svg'
import axios from "axios";

import {useNavigate} from "react-router-dom";
const DetailsBlock = (props) => {
    let [edit, setEdit] = useState(false);
    let [user, setUser] = useState(props.user)
    let navigate = useNavigate();
    useEffect(()=>{
        setUser(props.user)
    }, [props.user])
    return (
        <div className={classes.mainBlock}>
            <div className={classes.mainInfo}>
                <img src={person} className={classes['mainInfo__img']}/>
                <p className={classes['mainInfo__text']}>{user.userName}</p>
            </div>
                <div className={classes.infoItem}>
                    <p className={classes.title}>Дата создания аккаунта: <span className={classes.subtitle}>{user.dateCreated}</span><input className={classes.inputHidden + ' ' + (edit ? classes.inputVisible : '')} type='text' /></p>
                </div>
          <div className={classes.btnContainer}>

              <button className={buttons['green-btn'] + ' ' + classes.editBtn + ' ' + classes.red} onClick={(e)=>{setEdit(false);
                  axios.post('http://localhost:8080/profile/delete', {
                      pass: user['pass'],
                      email: user['email'],

                  })
                      .then(function (response) {
                          if(response.data) {
                                alert('Пользователь удален')
                                sessionStorage.clear()
                                navigate('/');
                          }

                          else {
                              alert('Повторите пароль ')

                          }})
                      .catch(function (error) {

                      });
              }}>Удалить аккаунт</button>

          </div>
        </div>
    );
};

export default DetailsBlock;
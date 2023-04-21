import React, {useEffect, useState} from 'react';
import classes from "./Header.module.sass";
import buttons from "../UI/buttons.module.sass"
import axios from "axios";
import {Link} from "react-router-dom";
import logo1 from "./logo.svg";


const Header = () => {

    let [crawItems, setCrawItems] = useState([]);
    let [sign, setSign] = useState(false);
    useEffect(()=>{
        axios.post('http://localhost:8080/', {})
            .then(function (response) {
                    setCrawItems(response.data['coinsLists']);
            })
            .catch(function (error) {

            });
    },[]);
    useEffect(() => {
        let interval = setInterval(() => {
            axios.post('http://localhost:8080/', {})
                .then(function (response) {
                    setTimeout(() => {
                        setCrawItems(response.data['coinsLists']);
                    }, 15000)
                })
                .catch(function (error) {

                });
            return () => {
                clearTimeout(interval);
            };
        }, 5000);
    }, []);
    useEffect(() => {
            let data = JSON.parse(sessionStorage.getItem('user'));
            if (data !== null) {
                setSign(true);
            } else {
                setSign(false);
            }
    }, []);
    useEffect(() => {
        let interval = setInterval(() => {
            let data = JSON.parse(sessionStorage.getItem('user'));
            if (data !== null) {
                setSign(true);
            } else {
                setSign(false);
            }

        }, 1000);
        return () => {
            clearTimeout(interval);
        };
    }, []);


    return (
        <header>
            <div className={classes.container}>
                <Link to='/' className={classes.logo}>
                    <img src={logo1} alt="Logo" className={classes['logo_img']}/>
                </Link>
                <div className={classes.crawlLine}>
                    <div className={classes.carouseContainer}>
                        {crawItems.map((el, index) => (
                            <div className={classes['crawlLine-items']} key={index}>
                                <span className={classes['crawlLine-items__name']}>{el.name} </span>
                                <span className={classes['crawlLine-items__price']}>{el.price}</span>
                                <span
                                    className={classes['crawlLine-items__gap'] + ' ' + (el.sign ? classes.green : classes.red)}>
                                      {el.sign ? '+' : ''}{el.gap}%</span>
                            </div>
                        ))}

                    </div>
                </div>
                <nav>
                    <Link to='/market' className={classes['navbar__item']}>Market</Link>
                    <Link to='/signin'
                          className={buttons['border-button'] + ' ' + (sign ? classes.signed : classes.notSigned)}>Вход</Link>
                    <Link to='/signup'
                          className={buttons['green-btn'] + ' ' + (sign ? classes.signed : classes.notSigned)}>Регистрация</Link>
                    {sign ? (<Link to="/profile/person"
                                    className={buttons['green-btn'] + ' ' + (sign ? classes['profile-v'] : classes['profile-h'])}>Личный
                        кабинет</Link>) : (<Link to="/" className={classes.notSigned}></Link>)}
                </nav>
            </div>
        </header>
    );
};

export default Header;
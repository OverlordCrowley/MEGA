import React, {useEffect, useState} from 'react';
import classes from "./Header.module.sass";
import logo from "./logo.svg"
import buttons from "../UI/buttons.module.sass"
import axios from "axios";
import {Link, NavLink} from "react-router-dom";


const Header = (props) => {
    let [crawItems, setCrawItems] = useState(props.items);
    useEffect(() =>{
        setCrawItems(props.items);
    }, [props.items]);
    let [sign, setSign] = useState(props.sign);
    useEffect(() =>{
        setSign(props.sign);
    }, [props.sign]);

    return (
        <header>
            {/*<div className={classes.container}>*/}
            {/*    <Link to='/' className={classes.logo}>*/}
            {/*        <img src={logo} alt="Logo" className={classes['logo_img']}/>*/}
            {/*    </Link>*/}
            {/*    <div className={classes.crawlLine}>*/}
            {/*        <div className={classes.carouseContainer}>*/}
            {/*            {crawItems.map((el, index) => (*/}
            {/*                <div className={classes['crawlLine-items']} key={index}>*/}
            {/*                    <span className={classes['crawlLine-items__name']}>{el.name} </span>*/}
            {/*                    <span className={classes['crawlLine-items__price']}>{el.price}</span>*/}
            {/*                    <span className={classes['crawlLine-items__gap'] + ' ' + (el.sign ? classes.green : classes.red)}>*/}
            {/*                        {el.sign ? '+' : ''}{el.gap}%</span>*/}
            {/*                </div>*/}
            {/*            ))}*/}

            {/*        </div>*/}

            {/*    </div>*/}
            {/*    <nav>*/}
            {/*        <a href='/market' className={classes['navbar__item']}>Market</a>*/}
            {/*        /!*<NavLink to='market' className={classes['navbar__item']}>Market</NavLink>*!/*/}
            {/*        <a href='/signin' className={buttons['border-button'] + ' ' + (sign ? classes.signed : classes.notSigned)}>Вход</a>*/}
            {/*        <a href='/signup' className={buttons['green-btn']  + ' ' + (sign ? classes.signed : classes.notSigned)}>Регистрация</a>*/}
            {/*        {sign ? <a href="/profile/person" className={buttons['green-btn']  + ' ' + (sign === true ? classes['profile-v'] : classes['profile-h'] )}>Личный кабинет</a> : <a href="" className={classes.notSigned}></a>}*/}
            {/*    </nav>*/}
            {/*</div>*/}
        </header>
    );
};

export default Header;
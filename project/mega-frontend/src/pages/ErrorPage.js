import React from 'react';
import buttons from '../Components/UI/buttons.module.sass'
import classes from './ErrorPage.module.sass'
import success from '../images/error.svg'
import {Link} from "react-router-dom";
const ErrorPage = () => {
    return (
        <section className={classes.errorSection}>
            <div className={classes.container}>
                <p className={classes.errorTitle}>Ошибка транзакции</p>
                <img src={success} alt="" className={classes.errorImg}/>
                <Link to='/' className={classes.btnErr + ' ' + buttons['green-btn']}>Перейти на страницу с маркетом</Link>
            </div>
        </section>
    );
};

export default ErrorPage;
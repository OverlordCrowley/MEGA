import React from 'react';
import buttons from '../Components/UI/buttons.module.sass'
import classes from './SucsesfullPage.module.sass'
import success from '../images/fslint_103932 1.svg'
import {Link} from "react-router-dom";
const SucsesfullPage = () => {
    return (
        <section className={classes.sucsesSection}>
            <div className={classes.container}>
                <p className={classes.successTitle}>Транзакция успешно совершена</p>
                <img src={success} alt="" className={classes.successImg}/>
                <Link to='/' className={classes.btnSuc + ' ' + buttons['green-btn']}>Перейти в профиль</Link>
            </div>
        </section>
    );
};

export default SucsesfullPage;
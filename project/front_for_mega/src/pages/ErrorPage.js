import React from 'react';
import buttons from '../Components/UI/buttons.module.sass'
import classes from './ErrorPage.module.sass'
import success from '../images/error.svg'
import {Link} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../hooks/use-localstorage";
import i18n from '../i18n';
const ErrorPage = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    return (
        <section className={classes.errorSection}>
            <div className={classes.container}>
                <p className={classes.errorTitle}>{t('BuyErr')}</p>
                <img src={success} alt="" className={classes.errorImg}/>
                <Link to='/' className={classes.btnErr + ' ' + buttons['green-btn']}>{t('ToMarket')}</Link>
            </div>
        </section>
    );
};

export default ErrorPage;
import React from 'react';
import buttons from '../Components/UI/buttons.module.sass';
import classes from './SucsesfullPage.module.sass';
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../hooks/use-localstorage";
import i18n from '../i18n';
import success from '../images/fslint_103932 1.svg';
import {Link} from "react-router-dom";
const SucsesfullPage = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    return (
        <section className={classes.sucsesSection}>
            <div className={classes.container}>
                <p className={classes.successTitle}>{t('BuyDone')}</p>
                <img src={success} alt="" className={classes.successImg}/>
                <Link to='/' className={classes.btnSuc + ' ' + buttons['green-btn']}>{t('ToProfile')}</Link>
            </div>
        </section>
    );
};

export default SucsesfullPage;
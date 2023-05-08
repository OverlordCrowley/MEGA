import React, {useEffect, useState} from 'react';
import classes from "./BuyPage.module.sass"
import buttons from "../Components/UI/buttons.module.sass"
import {isNumber} from "chart.js/helpers";
import {useNavigate} from "react-router-dom";
import btc from '../images/bitcoin.png';
import bnb from '../images/bnb.png';
import busd from '../images/busd.png';
import eth from '../images/eth.png';
import gala from '../images/gala.png';
import magic from '../images/magic.png';
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../hooks/use-localstorage";
import i18n from '../i18n';
import axios from "axios";
const BuyPage = (props) => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    let navigate = useNavigate();
    let [crypt, setCrypt] = useState(props.box);

    if(crypt['name'] === ''){
        navigate('/market');
    }
    useEffect(()=>{
        setCrypt(props.box);
    },[props.box]);
    useEffect( ()=>{
        let obj = props.box;
        switch(obj['name']){
            case "Bitcoin":
                obj['src'] = btc;
                break;
            case "Binancecoin":
                obj['src'] = bnb;
                break;
            case "Binance-usd":
                obj['src'] = busd;
                break;
            case "Gala":
                obj['src'] = gala;
                break;
            case "Ethereum":
                obj['src'] = eth;
                break;
            case "Magic":
                obj['src'] = magic;
                break;
        }
        setCrypt(obj);
    }, [crypt])


    let couseUSD = 445;
    let [search1, setsearch1] = useState('');
    let [search2, setsearch2] = useState('');

    useEffect(() =>{
        let info = Number(search1);
        if(isNumber(info) && info !== 0 && info > 0){
            let result = ((info/couseUSD) / crypt.price).toFixed(4);
           setsearch2(result);
        }
        else{
            setsearch1('');
        }
    }, [search1]);

    useEffect(() =>{
        let info = Number(search2);
        if(isNumber(info) && info !== 0 && info > 0){
            let res = (crypt.price * info * couseUSD).toFixed(0);
            setsearch1(res);
        }
        else{
            setsearch1('');
        }
    }, [search2]);

    console.log(crypt
    )

    return (
        <section className={classes.buySection}>
            <div className={classes.container + ' ' + classes.buyContainer}>
                <form action="project/mega-frontend/src/pages#">
                    <label>{t('Of')}</label>
                    <div className={classes.fiatBox}>
                        <div className={classes.kzt}><span className={classes.ttx}>KZT</span></div>
                        <input type="text" value={search1} onChange={(e) =>{setsearch1(e.target.value)}} maxLength='10' pattern='[0-9]'/>
                    </div>

                    <label>{t('InB')}</label>
                    <div className={classes.cryptBox}>
                        <img src={crypt.src} className={classes['cryptBox__img']}/>
                        <input type="text" value={search2}  onChange={(e) =>{setsearch2(e.target.value)}} maxLength='8' pattern='\d [0-9]'/>

                    </div>
                    <button onClick={()=>{
                        let data = JSON.parse(sessionStorage.getItem('user'));
                        if(data){
                            let infos = crypt;
                            infos['count'] = search2;
                            infos['tg'] = search1;
                            infos['all'] =  infos['count'] *  infos['price'];
                            props.onChange(infos);
                            navigate('/card')
                        }
                    }
                    } className={buttons['border-button'] + ' ' + classes.buyButton}>{t('Buy')}</button>
                </form>
            </div>
        </section>
    );
};

export default BuyPage;
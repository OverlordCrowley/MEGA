import React, {useEffect, useState} from 'react';
import classes from "./ProfilePage.module.sass"
import PersonBlock from "../Components/personBlock/PersonBlock";
import PrivateBlock from "../Components/privateBlock/PrivateBlock";
import DetailsBlock from "../Components/detailsBlock/DetailsBlock";
import Briefcase from "../Components/briefcase/Briefcase";
import Output from "../Components/output/Output";
import HistoryBlock from "../Components/historyBlock/HistoryBlock";
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import Main from "./Main";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../hooks/use-localstorage";
import i18n from '../i18n';
import MarketPage from "./MarketPage";
import Notfoundpage from "./Notfoundpage";
const ProfilePage = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    let [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    let data = sessionStorage.getItem('user')
    let [signed, setSigned] = useState(false);
    useEffect(()=>{
        let data = sessionStorage.getItem('user')
        if(data){
            setUser(JSON.parse(data));
            setSigned(true);
        }
        else{
            setSigned(false);
        }
    }, [])


    let navigate = useNavigate();
    return (
        <section className={classes.profile}>
            <div className={classes.container}>
                <div className={classes.leftBlock}>
                    <Link to='person'  className={classes.navbarItem}
                    >{t('Person')}</Link>
                    <Link to='private'   className={classes.navbarItem}>{t('Private')}</Link>
                    <Link to='briefcase'  className={classes.navbarItem}>{t('Briefcase')}</Link>
                    <Link to='output' className={classes.navbarItem}>{t('Output')}</Link>
                    <Link to='history'  className={classes.navbarItem}>{t('History')}</Link>
                    <Link to='details'  className={classes.navbarItem}>{t('Details')}</Link>
                    <a onClick={
                        ()=>{
                            sessionStorage.clear();
                            navigate('/');
                        }
                    }  className={classes.navbarItem}>{t('LogOut')}</a>
                </div>
                <div className={classes.rightBlock}>
                        <Routes>
                                <Route path="person"  element={<PersonBlock user={user}/>} />
                                <Route path="history"  element={<HistoryBlock user={user}/>} />
                                <Route path="details" element={<DetailsBlock user={user}/>} />
                                <Route path="output" element={<Output user={user}/>} />
                                <Route path="briefcase" element={<Briefcase user={user}/>} />
                                <Route path="private" element={<PrivateBlock user={user}/>} />
                                <Route path="*" element={<Notfoundpage/>} />
                        </Routes>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
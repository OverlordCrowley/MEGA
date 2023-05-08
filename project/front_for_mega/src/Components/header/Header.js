import React, {useContext, useEffect, useState} from 'react';
import classes from "./Header.module.sass";
import buttons from "../UI/buttons.module.sass"
import axios from "axios";
import {Link} from "react-router-dom";
import logo1 from "./logo.svg";
import Context from "../Context/Context";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../../hooks/use-localstorage";
import i18n from '../../i18n';


const Header = () => {

    let [crawItems, setCrawItems] = useState([]);
    let [sign, setSign] = useState(false);
    let {isActive, setIsActive} = useContext(Context);
    useEffect(()=>{
        setIsActive(true);
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


    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');



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
                    <Link to='/market' className={classes['navbar__item']}>{t("Market")}</Link>
                    <Link to='/signin'
                          className={buttons['border-button'] + ' ' + (sign ? classes.signed : classes.notSigned)}>{t('SignIn')}</Link>
                    <Link to='/signup'
                          className={buttons['green-btn'] + ' ' + (sign ? classes.signed : classes.notSigned)}>{t('SingUp')}</Link>
                    {sign ? (<Link to="/profile/person"
                                    className={buttons['green-btn'] + ' ' + (sign ? classes['profile-v'] : classes['profile-h'])}>{t('PersonBtn')}
                        кабинет</Link>) : (<Link to="/" className={classes.notSigned}></Link>)}
                </nav>

                <div className={classes.langBlock}>
                    <button className={classes.langitem}
                            onClick={(e)=>{
                                i18n.changeLanguage('kz');
                                setLanguage('language', 'kz');
                            }
                            }
                    ><img className={classes.flag} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAARVBMVEVHcEwAr8oAr8oAr8oAr8oAr8qAvozvylXfyF2/xWzPx2QwtLP/zE0Ar8qvw3SfwXxgupsQscJQuKNwvJMgs7qPv4RAtqtJyj99AAAABnRSTlMAv+8gYM8kRjtcAAACA0lEQVR4Xu2XCY7iQAxF6QXvrnW5/1GH0K1BgwJ0SEkjtXgHeIp/yi7X4ffy4sXnm+/g7fNb83H0nRw/zp533837Yjr6BI6nfNw9dDSIvofPw5IzYGRJvoe3w6JjRMPou/gSGZqFCaJohJamfNGJOEc0JyOggDSjtGBC1CeIhiFZ81s0z+r6o4w6QL+VkTq0UXN3fShqaIRkvk7XGitUaOEHIkJk9DWgDSpYA1dJuT8qjSzwjZOdKUkVZulcUB+IBolZWCtNYykx2hmOacRxP2ykEJh8BRWK9o0E1EcHMjBzWqkLIIH9BQpAuyuqKIzF10wkFxFzb/dL6yirLdIGANuFBEXviiIREqwkVK5FSR93f/Argnuu/E9pS0T9btMiGlx5FGlUqHARQQUYYpq3iZCsehMMl99P6sUQ26bSVMxIl0PI356YSixshmlT2FkMsXqmFDoJMXAh9WFmlLf9fkVUUlDFgjUySGo9U0KrGw9kFswD1aOmCP08RrJoQ9StLZIp5CL1MtgKVe82tjdtQXBPlNSz+kgM2avBM2OkLvUWZuEgxnq2PjfYGkA5x1XzVwunp0ett5ZBxqIZUHYNf+9mUHJmMyt7riNXB7ITse69IH2UkvSHV7ZQn7ZETFtrpi1ac1e//7+MTluPpy3s054Qsx41055Zsx5+s56iv5YXL/4A/zC4/dVbQakAAAAASUVORK5CYII=" alt="kz"/></button>
                    <button className={classes.langitem}
                            onClick={(e)=>{
                                i18n.changeLanguage('ru');
                                setLanguage('ru');
                            }
                            }
                    ><img className={classes.flag} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAKlBMVEVHcEzOICju7u7OICju7u7OICju7u7OICju7u7u7u7OICju7u4iQIzOICj69yL4AAAAC3RSTlMAIM9gv78gz2Dv7xoaXVoAAABwSURBVHja7dCJCcAwEANB+YufS/pvN9ikg1PAGG0BgxCUOreWzVFuH3NFcxav5XRz16cUjVAEmlFqyBwow0gJErQXdJMSJEiQIEH/Qw8pQYL2ggrHKUgcKAGV4VQAYfidETCl6t4TgFUqrp8TlDq2F6zLrQfE7j93AAAAAElFTkSuQmCC" alt="ru"/></button>
                    <button className={classes.langitem}
                            onClick={(e)=>{
                                i18n.changeLanguage('en');
                                setLanguage('en');
                            }
                            }
                    ><img className={classes.flag} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAASFBMVEVHcEzu7u6yIzSyIzQ8O26yIzTu7u6yIzSyIzSyIzQ8O248O248O248O248O26yIzTu7u5tbJKenbdIR3fn5+15eJv////CwtLh3403AAAADnRSTlMAYBAgIO+vv2DPYL/P78tfW7cAAAC3SURBVHhe7dK9EoQgDIXRq66irpvE//d/0x3pARmoMjlNuq/IXOhlzPylKI5yIzx8FkrghKnznR+VhrhvASxUHmIHzE/gPIkiV9IaPH++j+OmyJW0AU9gv649duUFH1q3bQ3dnFDsPx6/4EOh/2SHQv/JDoX+kx8q35GA6uxI1O7IdmQ7SuMXNIekEs0hrkRbSP+ObEe2o0GqGNBIFQ3guAIHoO25WN8CQDdxoamDh9FxATdCLWP+KPnfX8FNNiYAAAAASUVORK5CYII=" alt="en"/></button>
                </div>
            </div>
        </header>
    );
};

export default Header;
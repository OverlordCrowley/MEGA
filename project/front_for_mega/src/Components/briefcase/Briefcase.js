import React, {useContext, useEffect, useState} from 'react';
import classes from "./Briefcase.module.sass"
import person from '../../images/user.svg';
import btc from '../../images/bitcoin.png';
import bnb from '../../images/bnb.png';
import busd from '../../images/busd.png';
import eth from '../../images/eth.png';
import gala from '../../images/gala.png';
import magic from '../../images/magic.png';
import buttons from "../UI/buttons.module.sass";
import axios from "axios";
import Preloader from "../Preloader/Preloader";
import Context from "../Context/Context";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../../hooks/use-localstorage";
import i18n from '../../i18n';

const Briefcase = (props) => {
    let [user, setUser] = useState(props.user);
    let [list, SetList] = useState([]);
    let {isActive, setIsActive} = useContext(Context);
    useEffect(() => {
        setActive(true);
        axios.post('http://localhost:8080/profile/briefcase', {
            pass: user['pass'],
            email: user['email'],
        })
            .then(async function (response) {

                if (response.data) {
                    let List = [...response.data];
                    let newList = [];
                    newList = List.map(el => {
                        let obj = el;
                        if (el['imgName'] === "bitcoin") {
                            obj['src'] = btc;
                        }
                        if (el['imgName'] === "gala") {
                            obj['src'] = gala;
                        }
                        if (el['imgName'] === "binancecoin") {
                            obj['src'] = bnb;
                        }
                        if (el['imgName'] === "ethereum") {
                            obj['src'] = eth;
                        }
                        if (el['imgName'] === "binance-usd") {
                            obj['src'] = busd;
                        }
                        if (el['imgName'] === "magic") {
                            obj['src'] = magic;
                        }
                        return obj;

                    })
                    SetList(newList);

                } else {

                }
            })
            .catch(function (error) {

            });
    }, []);

    useEffect(() => {
        filterCrypt(info);
    }, [list]);

    let [newcrypt, setNewcrypt] = useState([]);
    let [info, setInfo] = useState('');
    let [inputValue, setInputValue] = useState({});
    let [active, setActive] = useState(false);


    const filterCrypt = (value) => {
        let filteredCrypt;
        if (!value) {
            filteredCrypt = list;
        } else {
            filteredCrypt = list.filter((el) =>
                el['nameCrypt'].toLowerCase().includes(value.toLowerCase())
            );
        }
        setNewcrypt(filteredCrypt);
    }
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');

    const imageData = props.user['img'];
    const dataStartIndex = imageData.indexOf(',') + 1;
    const base64ImageData = imageData.substring(dataStartIndex);
    const decodedImageData = atob(base64ImageData);
    const imageDataArray = new Uint8Array(decodedImageData.length);
    for (let i = 0; i < decodedImageData.length; i++) {
        imageDataArray[i] = decodedImageData.charCodeAt(i);
    }
    const blob = new Blob([imageDataArray], { type: 'image/jpeg' });

    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const objectUrl = URL.createObjectURL(blob);
        setImageSrc(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, []);

    return (
        <div className={classes.mainBlock} onClick={(e) => {

            setActive(false);
        }
        }>
            <div className={classes.mainInfo}>
                <img src={imageSrc} className={classes['mainInfo__img']}/>
                <p className={classes['mainInfo__text']}>{user.userName}</p>

            </div>
            <div className={classes.Search}>
                <input type="text" value={info} onChange={(e) => {
                    let value = e.target.value;
                    // const Debounce = setTimeout(() => {
                        filterCrypt(value);
                    // }, 300);
                    setInfo(value);
                }}
                       onClick={(e) => {
                           e.stopPropagation();
                           setActive(true)
                       }} className={classes.searchInput}
                       placeholder={t('NameOfCrypt')}/>
                <div className={active ? classes.searchBox : classes['searchBox-h']}>
                    {newcrypt.map((el, index) => (
                        <div className={classes['searchBox-item']} key={index}>
                            <img src={el.src} className={classes['searchBox-item__img']}/>
                            <div className={classes['searchBox-item__right']}>
                                <p className={classes['searchBox-item__title']}>{el['nameCrypt']}</p>
                            </div>
                            <p className={classes.price}>{el['count']}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Briefcase;
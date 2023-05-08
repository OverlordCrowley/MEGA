import React, {useEffect, useState} from 'react';
import classes from "./Output.module.sass"
import person from '../../images/user.svg'
import bitcoin from "../../images/bitcoin.png";
import buttons from "../UI/buttons.module.sass";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../../hooks/use-localstorage";
import i18n from '../../i18n';
import {useNavigate} from "react-router-dom";
const Output = (props) => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    let [user, setUser] = useState(props.user);
    let [crypt, setCrypt] = useState(
        []
    );

    let [newcrypt,setNewcrypt] = useState([]);
    let [list,SetList] = useState(crypt);
    let [info, setInfo] = useState('');
    let [inputValue, setInputValue] = useState({});
    let [active, setActive] = useState(false);
    let [wallet, setWallet] = useState('');
    let [counts, setCounts] = useState(0);
    let [arr, setArr] = useState([]);
    const send = (el) => {
        let indexItem = 0;
        newcrypt.map((el, index) => {
            if (el.fullName === info) {
                indexItem = index;
            }
        })



        }


    const filterCrypt = (info1, crypt1) => {
        if(!info1){
            return crypt1;
        }
        return crypt1.filter((el) =>
            el.fullName.toLowerCase().includes(info1.toLowerCase())
        )
    }


    useEffect(() =>{
        const Debounce = setTimeout(() =>{
            let List = [...list];
            let newList = List.filter(el=>{
                if(el.count !== 0){return el}
            });
            const filteredCrypt = filterCrypt(info, newList);
            let oldArr = [...arr]
            oldArr = filteredCrypt.map(el=>{return el.fullName})
            setArr(oldArr)


            setNewcrypt(filteredCrypt);
        }, 300);
        return() => clearTimeout(Debounce);
    }, [info]);

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
                <input type="text" value={info} onChange={(e) => {setInfo(e.target.value);}}
                       onClick={(e) =>{e.stopPropagation();
                           setActive(true)}} className={classes.searchInput}
                       placeholder={t('NameOfCrypt')}/>
                <div className={active ? classes.searchBox : classes['searchBox-h']}>
                    {newcrypt.map((el,index) => (
                        <div className={classes['searchBox-item']} key={index} onClick={(e) => {e.stopPropagation(); setInfo(el.fullName);
                            setInputValue(e.target)}}
                             >
                            <img src={el.src} className={classes['searchBox-item__img']}/>
                            <div className={classes['searchBox-item__right']}>
                                <p className={classes['searchBox-item__title']}>{el.name}</p>
                                <p className={classes['searchBox-item__subtitle']}>{el.fullName}</p>
                            </div>
                            <p className={classes.price}>{el.count}</p>

                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.formBlock}>
                <label className={classes.subtitle}>{t('CountToSend')}</label>
                <input type="text" maxLength='8' onChange={(e)=>{setCounts(e.target.value)}}/>
            </div>
            <div className={classes.formBlock}>
                <label className={classes.subtitle}>{t('WalletToSend')}</label>
                <input type="text" maxLength='64' onChange={(e)=>{setWallet(e.target.value)}}/>
            </div>
            <button className={buttons['border-button'] + ' ' + classes.btnSend} onClick={
                ()=>{
                    let data = JSON.parse(sessionStorage.getItem('user'));
                    axios.post('http://localhost:8080/profile/output', {
                        wallet: wallet,
                        crypt: 'Bitcoin',
                        count: counts,
                        email: data['email'],
                        pass: data['pass'],
                    })
                        .then(function (response) {

                                console.log(response.data)
                                if(response.data === true){
                                    alert(t('Done'))
                                }
                                else{
                                    alert(t('Ошибка'))
                                }

                        })
                        .catch(function (error) {

                        });
                }
            }>{t('Send')}</button>
        </div>
    );
};

export default Output;
import React, {useContext, useEffect, useState} from 'react';
import classes from "./HistoryBlock.module.sass"
import buttons from "../UI/buttons.module.sass"
import person from '../../images/user.svg'
import axios from "axios";
import Context from "../Context/Context";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../../hooks/use-localstorage";
import i18n from '../../i18n';
const HistoryBlock = (props) => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    let [edit, setEdit] = useState(false);
    let [history, setHistory] = useState([]);
    let data = JSON.parse(sessionStorage.getItem('user'));
    let {isActive, setIsActive} = useContext(Context);
    useEffect(()=>{
        setIsActive(true);
        axios.post('http://localhost:8080/profile/history', {
            email: data['email'],
            pass: data['pass'],
        })
            .then(function (response) {
                setHistory(response.data)
            })
            .catch(function (error) {

            });
    },[])
    let [user, setUser] = useState(props.user);
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
        <div className={classes.mainBlock}>
            <div className={classes.mainInfo}>
                <img src={imageSrc} className={classes['mainInfo__img']}/>
                <p className={classes['mainInfo__text']}>{user.userName}</p>
            </div>
            <div className={classes.tableHead}>
              <table className={classes.Heead}>
                  <thead>
                  <tr className={classes.historyRow}>
                      <th className={classes.historyColumns}>id</th>
                      <th className={classes.historyColumns}>{t('Date')}</th>
                      <th className={classes.historyColumns}>{t('Wallet')}</th>
                      <th className={classes.historyColumns}>{t('Crypt')}</th>
                      <th className={classes.historyColumns}>{t('Count')}</th>
                  </tr>
                  </thead>
              </table>
            </div>
            <table className={classes.historyTable}>
                <tbody>
                {history.map((el,index)=>(
                    <tr className={classes.historyRow} key={index}>
                        <td className={classes.historyData}>{el.id}</td>
                        <td className={classes.historyData}>{el.date}</td>
                        <td className={classes.historyData}>{el['nameWallet']}</td>
                        <td className={classes.historyData}>{el['nameCrypt']}</td>
                        <td className={classes.historyData}>{el.count}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
};

export default HistoryBlock;
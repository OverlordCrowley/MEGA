import React, {useEffect, useState} from 'react';
import classes from "./Output.module.sass"
import person from '../../images/user.svg'
import bitcoin from "../../images/bitcoin.png";
import buttons from "../UI/buttons.module.sass";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const Output = (props) => {
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



    return (
        <div className={classes.mainBlock} onClick={(e) => {

        setActive(false);
        }
        }>
            <div className={classes.mainInfo}>
                <img src={person} className={classes['mainInfo__img']}/>
                <p className={classes['mainInfo__text']}>{user.userName}</p>

            </div>
            <div className={classes.Search}>
                <input type="text" value={info} onChange={(e) => {setInfo(e.target.value);}}
                       onClick={(e) =>{e.stopPropagation();
                           setActive(true)}} className={classes.searchInput}
                       placeholder='Введите название криптовалюты'/>
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
                <label className={classes.subtitle}>Введите количество отправляемой криптовалюты</label>
                <input type="text" maxLength='8' onChange={(e)=>{setCounts(e.target.value)}}/>
            </div>
            <div className={classes.formBlock}>
                <label className={classes.subtitle}>Введите кошелек ниже</label>
                <input type="text" maxLength='64' onChange={(e)=>{setWallet(e.target.value)}}/>
            </div>
            <button className={buttons['border-button'] + ' ' + classes.btnSend} onClick={
                ()=>{
                    let data = JSON.parse(sessionStorage.getItem('user'));
                    console.log(wallet)
                    console.log(info)
                    console.log(counts)
                    console.log(data['email'])
                    console.log(data['pass'])
                    axios.post('http://localhost:8080/profile/output', {
                        wallet: wallet,
                        crypt: 'Bitcoin',
                        count: counts,
                        email: data['email'],
                        pass: data['pass'],
                    })
                        .then(function (response) {


                                if(response.data === true){
                                    alert('Средства были успешно переведены')
                                }
                                else{
                                    alert('Ошибка')
                                }

                        })
                        .catch(function (error) {

                        });
                }
            }>отправить</button>
        </div>
    );
};

export default Output;
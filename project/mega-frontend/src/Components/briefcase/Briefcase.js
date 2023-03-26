import React, {useEffect, useState} from 'react';
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
const Briefcase = (props) => {
    let [user, setUser] = useState(props.user);
    let [list,SetList] = useState([]);
    useEffect(()=>{
        axios.post('http://localhost:8080/profile/briefcase', {
            pass: user['pass'],
            email: user['email'],
        })
            .then(function (response) {
                if(response.data) {
                    let List = [...response.data];
                    let newList = [];
                    newList = List.map(el=>{
                        let obj = el;
                        if(el['imgName'] === "bitcoin"){
                            obj['src'] = btc;
                        }
                        if(el['imgName'] === "gala"){
                            obj['src'] = gala;
                        }
                        if(el['imgName'] === "binancecoin"){
                            obj['src'] = bnb;
                        }
                        if(el['imgName'] === "ethereum"){
                            obj['src'] = eth;
                        }
                        if(el['imgName'] === "binance-usd"){
                            obj['src'] = busd;
                        }
                        if(el['imgName'] === "magic"){
                            obj['src'] = magic;
                        }
                        return obj;

                    })
                    SetList(newList);

                }

                else {

                }})
            .catch(function (error) {

            });
    }, [])

    let [newcrypt,setNewcrypt] = useState([]);
    let [info, setInfo] = useState('');
    let [inputValue, setInputValue] = useState({});
    let [active, setActive] = useState(false);


    const filterCrypt = (info1, crypt1) => {
        if(!info1){
            return crypt1;
        }
        return crypt1.filter((el) =>
            el['nameCrypt'].toLowerCase().includes(info1.toLowerCase())
        )
    }


    useEffect(() =>{
        const Debounce = setTimeout(() =>{
            let List = [...list];
            let newList = List.filter(el=>{
                if(el['count'] !== 0){return el}
            });
            const filteredCrypt = filterCrypt(info, newList);
            setNewcrypt(filteredCrypt);
        }, 300);
        return() => clearTimeout(Debounce);
    }, [info]);

    console.log('--- new crypt ---');
    console.log(newcrypt);

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
                        <div className={classes['searchBox-item']} key={index}

                             >
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
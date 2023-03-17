import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, Filler,
} from 'chart.js';
import { Line, Chart } from 'react-chartjs-2';
import classes from './MarketPage.module.sass';
import buttons from '../Components/UI/buttons.module.sass';
import btc from './../images/bitcoin.png';
import bnb from './../images/bnb.png';
import busd from './../images/busd.png';
import eth from './../images/eth.png';
import gala from './../images/gala.png';
import magic from './../images/magic.png';

import axios from "axios";
import {useNavigate} from "react-router-dom";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);






const MarketPage = (props) => {
    let [rod, setRod] = useState([]);
    let [graph1, setGraph1] = useState([]);

    setInterval(()=>{
        axios.post('http://localhost:8080/market', {

        })
            .then(function (response) {
                setGraph1(response.data['marketList']);
                setRod(response.data['rodObject']['listObjects']);


            })
            .catch(function (error) {

            });

    }, 3000)

    let [info, setInfo] = useState('Bitcoin');
    let [pricearr, setPricearr] = useState();
    let [namearr, setNamearr] = useState();
    let [dataarr, setDataarr] = useState();
    let index1;
    useEffect(()=>{
        graph1.forEach((el, index)=>{
            if(el.name === info){
                index1 = index;
                setPricearr(el.price)
                setDataarr(el.date)
                setNamearr(el.name)

            }

        })
    }, [graph1])


    useEffect(()=>{
        namearr = info;
    },[info])

    let options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false,
                }
            },
        },
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: namearr,
            },
            backgroundColor: 'rgba(0, 0, 0, 1)',

        },
    };

    let labels = dataarr;

    const data = {
        labels,
        datasets: [
            {
                label: namearr + ' in USDT',
                data: pricearr,
                borderColor: '#00C46B',
                borderWidth: 5,
                fill: true,
                backgroundColor: 'rgba(0,196,107, 0.2)',
                color: '#00C46B',
                pointHoverRadius: 15,
                cubicInterpolationMode: 'monotone',

            },

        ],
    };
    let [crypt, setCrypt] = useState([])
    useEffect(()=>{
        let list = [...rod];
        let newList = [];
        list.map(el=>{
            let obj = el;
            if(el.nameImg === 'btc'){
                 obj['src'] = btc;
            }
            else if(el.nameImg === 'gala'){
                obj['src'] = gala;
            }
            else if(el.nameImg === 'magic'){
                obj['src'] = magic;
            }
            else if(el.nameImg === 'eth'){
                obj['src'] = eth;
            }
            else if(el.nameImg === 'busd'){
                obj['src'] = busd;
            }
            else if(el.nameImg === 'bnb'){
                obj['src'] = bnb;
            }
            newList.push(obj);
        });

        setCrypt(newList)

    }, [rod])
    let [newcrypt,setNewcrypt] = useState([])

    let [active, setActive] = useState(false);


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
           const filteredCrypt = filterCrypt(info, crypt);
            setNewcrypt(filteredCrypt);
        }, 300);

        return() => clearTimeout(Debounce);
    }, [info]);
    let navigate = useNavigate();

    return (
        <section className={classes.market} onClick={() =>{setActive(false);}}>
            <div className={classes.container}>
               <div className={classes.canvarContainer}>
                   <Line options={options} data={data} />
               </div>
                <div className={classes.Search}>
                    <input type="text" value={info} onChange={(e) => {setInfo(e.target.value);}} onClick={(e) =>{e.stopPropagation(); setActive(true)}} className={classes.searchInput} placeholder='Введите название криптовалюты'/>
                    <div className={active ? classes.searchBox : classes['searchBox-h']}>
                        {newcrypt.map((el,index) => (
                            <div className={classes['searchBox-item']} key={index} onClick={(e) => {e.stopPropagation(); setInfo(el.fullName);}}>
                            <img src={el.src} className={classes['searchBox-item__img']}/>
                            <div className={classes['searchBox-item__right']}>
                            <p className={classes['searchBox-item__title']}>{el.name}</p>
                            <p className={classes['searchBox-item__subtitle']}>{el.fullName}</p>
                            </div>
                            </div>
                        ))}
                    </div>

                    <a onClick={(e)=>{
                        let data = JSON.parse(sessionStorage.getItem('user'));
                        if(data){

                            let index = [...pricearr].length;
                            props.onChange({name: info, count: 0, price: [...pricearr][index-1] , all: 0});
                            navigate('/buy')
                        }


                    }}  className={buttons['border-button'] + ' ' + classes.btnA}>Купить</a>
                </div>

            </div>
        </section>
    );
};

export default MarketPage;
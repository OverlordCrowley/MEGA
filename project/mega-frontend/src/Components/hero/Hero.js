import React, {useEffect, useState} from 'react';
import classes from "./Hero.module.sass";
import buttons from "../UI/buttons.module.sass"
import axios from "axios";
import {data} from "../../pages/MarketPage";
const Hero = () => {
    let [price, setPrice] =useState(22000);


    useEffect(() => {
            axios.post('http://localhost:8080/', {})
                .then(function (response) {
                    setPrice(response.data['price']);

                })
                .catch(function (error) {

                });
    }, []);
    useEffect(() => {
        let interval = setInterval(() => {
            axios.post('http://localhost:8080/', {})
                .then(function (response) {
                    setPrice(response.data['price']);

                })
                .catch(function (error) {

                });

        }, 5000);
        return () => {
            clearTimeout(interval);
        };
    }, []);


    return (
        <section className={classes.hero}>
            <div className={classes.container}>
             <div className={classes.mainInfo}>
                 <h4 className={classes.title}>Используйте все примущество криптовалют</h4>
                 <p className={classes.subtitle}>Не упустите момент</p>
                 <div className={classes.buy}>
                     <span className={classes.text}><span className={classes.bit}>Bitcoin</span> в USD</span>
                     <p><span className={classes.dollar}>$</span>{price}</p>
                 </div><br/>
                 <a href='/market' className={buttons['border-button'] + ' ' + classes.buyBtn}>Купить</a>
             </div>

            </div>
        </section>
    );
};

export default Hero;
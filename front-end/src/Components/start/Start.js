import React, {useEffect, useState} from 'react';
import classes from "./Start.module.sass";
import buttons from "../UI/buttons.module.sass"
import user from "./user.svg"
import card from "./card.svg"
import crypt from "./bitcoin.svg"
import {Link} from "react-router-dom";
const Start = (props) => {

    return (
        <section className={classes.start}>
            <div className={classes.container + " " + classes.containerSmall}>
                <h4 className={classes.title}>Криптовалюты — это доступно:</h4>
                <p className={classes.subtitle}>Присоединяйтесь к наше сообществу, которое насчитывает 300 000+ пользователей</p>
             <div className={classes.startContainer}>
                 <div className={classes['startContainer__left']}>
                     <iframe width="560" height="315" src="https://www.youtube.com/embed/6KrjlejK_Dk"
                             title="YouTube video player" frameBorder="0"
                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                             allowFullScreen></iframe></div>
                 <div className={classes['startContainer__right']}>
                     <div className={classes.startList}>
                         <div className={classes['startList-item']}>
                             <img src={user} alt="User icon" className={classes['startList-item__img']} />
                             <p className={classes['startList-item__text']}>1. Создайте аккаунт</p>
                         </div>
                         <div className={classes['startList-item']}>
                             <img src={card} alt="Card icon" className={classes['startList-item__img']} />
                             <p className={classes['startList-item__text']}>2. Пополните аккаунт</p>
                         </div>
                         <div className={classes['startList-item']}>
                             <img src={crypt} alt="Crypt icon" className={classes['startList-item__img']} />
                             <p className={classes['startList-item__text']}>3. Совершите сделку</p>
                         </div>
                         {/*<div className={classes['startList-item']}>*/}
                         {/*    <a href='singin' className={buttons['green-btn'] + ' ' + buttons['green-btn-w']}>Создать аккаунт</a>*/}
                         {/*</div>*/}
                     </div>
                 </div>
             </div>
            </div>
        </section>
    );
};

export default Start;
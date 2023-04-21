import classes from "./Footer.module.sass";
import logo from "./logo.svg"
import wk from "./wk.svg"
import ins from "./inst.svg"
import tg from "./tg.svg"
import fb from "./fb.svg"
import {Link} from "react-router-dom";
const Footer = (props) => {

    return (
        <footer>
            <div className={classes.container}>
                <Link to='/' className={classes.logo}>
                    <img src={logo} alt="Logo" className={classes['logo_img']}/>
                </Link>
               <div className={classes.columns}>
                   <ul>
                       <li className={classes['footer__title']}>Полезные ссылки</li>
                       <li><a href="https://ru.investing.com/economic-calendar/" className={classes['footer__text']}>Новостной портал</a></li>
                       <li><a href="https://ru.investing.com/technical/technical-analysis" className={classes['footer__text']}>Технический анализ</a></li>
                       <li><a href="https://ru.tradingview.com/chart/40Mrtapb/" className={classes['footer__text']}>Графики рынка</a></li>
                   </ul>
                   <ul>
                       <li className={classes['footer__title']}>Полезные ссылки</li>
                       <li><a href="https://www.binance.com/ru" className={classes['footer__text']}>Binance</a></li>
                       <li><a href="https://www.bybit.com/ru-RU/" className={classes['footer__text']}>Bybit</a></li>
                       <li><a href="https://www.kraken.com/" className={classes['footer__text']}>Kraken</a></li>
                   </ul>
                   <div className={classes.socialBox}>
                       <p className={classes['socialBox__title']}>Мы в социальных сетях</p>
                       <ul className={classes.social}>
                           <li><a href="https://vk.com/kramzos" className={classes['footer__text']}>
                               <img src={wk} alt="Wk"/>
                           </a></li>
                           <li><a href="https://www.instagram.com/maksimkramzos/" className={classes['footer__text']}>
                               <img src={ins} alt="Instagram"/></a></li>
                           <li><a href="https://web.telegram.org/k/#-865695373" className={classes['footer__text']}>
                               <img src={tg} alt="Telegram"/>
                           </a></li>
                           <li><a href="https://www.facebook.com/people/%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9-%D0%97%D0%B0%D1%80%D1%83%D0%B1%D0%B8%D0%BD/pfbid0KR5QG5TZM4QDhfine3hx5HN4hbS6shoNjZTiE8cCcYNrCNQoeQnXmnK5pqtChrMZl/" className={classes['footer__text']}>
                               <img src={fb} alt="Facebook"/>
                           </a></li>
                       </ul>
                   </div>

               </div>
            </div>
        </footer>
    );
};

export default Footer;
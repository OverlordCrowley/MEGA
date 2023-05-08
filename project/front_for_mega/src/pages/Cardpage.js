import React, {useEffect, useState} from 'react';
import classes from './cr.sass'
import buttons from '../Components/UI/buttons.module.sass'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {isNumber} from "chart.js/helpers";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../hooks/use-localstorage";
import i18n from '../i18n';
const Cardpage = (props) => {
    let[ card, setCard] = useState();
    let[ month, setMonth] = useState();
    let[ year, setYear] = useState();
    let[ name, setName] = useState();
    let[ cvv, setCvv] = useState();
    let [crypt, setCrypt] = useState(props.box)
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');

    let navigate = useNavigate();
    return (
        <div>
            {/*<div className="container">*/}

            <div className='container containerAdd'>

               <div className="cardBox">
                   {/*<div id="card-success" className="hidden">*/}
                   {/*    <i className="fa fa-check"></i>*/}
                   {/*    <p>Оплата успешно совершена!</p>*/}
                   {/*</div>*/}
                   {/*<div id="form-errors" className="hidden">*/}
                   {/*    <i className="fa fa-exclamation-triangle"></i>*/}
                   {/*    <p id="card-error">Ошибка карты</p>*/}
                   {/*</div>*/}
                   <div id="form-container">

                       <div id="card-front">
                           <div id="shadow"></div>
                           <div id="image-container">
                               <span id="amount">{t('ToPay')} <strong>{crypt['all']}$</strong></span>
                               <span id="card-image">

        </span>
                           </div>


                           <label htmlFor="card-number">
                               {t('CardNum')}
                           </label>
                           <input type="text" id="card-number" value={card} placeholder="1234 5678 9101 1112"
                                  onChange={(e)=>{
                                    if(isNumber((e.target.value))){
                                        setCard(e.target.value)
                                        console.log(card)
                                    }
                           }
                           } minLength="16" maxLength='16'/>
                           <div id="cardholder-container">
                               <label htmlFor="card-holder">   {t('CardName')}
                               </label>
                               <input type="text" id="card-holder" value={name} placeholder="Maxim"
                                      onChange={(e)=>{
                                          if(!isNumber((e.target.value))){
                                              setName(e.target.value)
                                              console.log(card)
                                          }
                                      }
                                      }
                                      maxLength='45'/>
                           </div>


                           <div id="exp-container">
                               <label htmlFor="card-exp">
                                   {t('Be')}
                               </label>
                               <input id="card-month" value={month} onChange={(e)=>{setMonth(e.target.value)}} type="text" placeholder="MM" minLength="2"  maxLength='2'/>
                               <input id="card-year" value={year} onChange={(e)=>{setYear(e.target.value)}}  type="text" placeholder="YY" minLength="2"  maxLength='2'/>
                           </div>
                         <div className="bottomCont">
                             <div id="cvc-container">
                                 <label htmlFor="card-cvc"> CVC/CVV</label>
                                 <input id="card-cvc" value={cvv} onChange={(e)=>{setCvv(e.target.value)}} placeholder="XXX-X" type="text"  minLength="3" maxLength="4"/>
                                 <p>   {t('CVC/CVV')}</p>
                             </div>
                             <input type="text" id="card-token"/>
                             <button onClick={
                                 ()=>{
                                     let data = JSON.parse(sessionStorage.getItem('user'));
                                     if(data){
                                         axios.post('http://localhost:8080/card', {
                                             number: card,
                                             dataName: month+'/'+year,
                                             svv: cvv,
                                             crypt: crypt['name'],
                                             count: crypt['count'],
                                             email: data['email'],
                                             pass: data['pass'],
                                         })
                                             .then(function (response) {
                                                 // setBtcPrice(response.data)
                                                if(response.data){
                                                    navigate('/successful');
                                                }
                                                else{
                                                    navigate('/error');
                                                }
                                             })
                                             .catch(function (error) {

                                             });

                                     }
                                 }
                             } id="card-btn" className={buttons['border-button']}>{t('Send')}</button>
                         </div>


                       </div>




                   </div>
               </div>
            </div>



        </div>
    );
}

export default Cardpage;
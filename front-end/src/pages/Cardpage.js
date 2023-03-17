import React, {useEffect, useState} from 'react';
import classes from './cr.sass'
import buttons from '../Components/UI/buttons.module.sass'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {isNumber} from "chart.js/helpers";
const Cardpage = (props) => {
    let[ card, setCard] = useState();
    let[ month, setMonth] = useState();
    let[ year, setYear] = useState();
    let[ name, setName] = useState();
    let[ cvv, setCvv] = useState();
    let [crypt, setCrypt] = useState(props.box)
    // useEffect(()=>{
    //     setInterval(()=>{
    //         setCrypt(props.box)
    //     }, 10000)
    // },[props.box] )

    let navigate = useNavigate();
    return (
        <div>
            {/*<div className="container">*/}

            <div className='container containerAdd'>

               <div className="cardBox">
                   <div id="card-success" className="hidden">
                       <i className="fa fa-check"></i>
                       <p>Оплата успешно совершена!</p>
                   </div>
                   <div id="form-errors" className="hidden">
                       <i className="fa fa-exclamation-triangle"></i>
                       <p id="card-error">Ошибка карты</p>
                   </div>
                   <div id="form-container">

                       <div id="card-front">
                           <div id="shadow"></div>
                           <div id="image-container">
                               <span id="amount">К оплате: <strong>{crypt['price']}$</strong></span>
                               <span id="card-image">

        </span>
                           </div>


                           <label htmlFor="card-number">
                               Номер карты
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
                               <label htmlFor="card-holder">Имя владельца
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
                                   Истекает
                               </label>
                               <input id="card-month" value={month} onChange={(e)=>{setMonth(e.target.value)}} type="text" placeholder="MM" minLength="2"  maxLength='2'/>
                               <input id="card-year" value={year} onChange={(e)=>{setYear(e.target.value)}}  type="text" placeholder="YY" minLength="2"  maxLength='2'/>
                           </div>
                         <div className="bottomCont">
                             <div id="cvc-container">
                                 <label htmlFor="card-cvc"> CVC/CVV</label>
                                 <input id="card-cvc" value={cvv} onChange={(e)=>{setCvv(e.target.value)}} placeholder="XXX-X" type="text"  minLength="3" maxLength="4"/>
                                 <p>Последние 3 или 4 цифры</p>
                             </div>
                             <input type="text" id="card-token"/>
                             <button onClick={
                                 ()=>{

                                     let data = JSON.parse(sessionStorage.getItem('user'));

                                     console.log(data)
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
                             } id="card-btn" className={buttons['border-button']}>Отправить</button>
                         </div>


                       </div>




                   </div>
               </div>
            </div>



        </div>
    );
}

export default Cardpage;
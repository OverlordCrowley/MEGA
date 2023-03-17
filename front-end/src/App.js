import Header from "./Components/header/Header";
import React, {useEffect, useState} from "react";
import Footer from "./Components/footer/Footer";
import {Routes, Route, Link, BrowserRouter} from 'react-router-dom';
import Main from './pages/Main';
import Notfoundpage from './pages/Notfoundpage';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import axios from "axios";
import logo1 from "./Components/header/logo.svg"
import MarketPage from "./pages/MarketPage";
import classes from './Components/header/Header.module.sass'
import ProfilePage from "./pages/ProfilePage.js";
import Cardpage from "./pages/Cardpage";
import buttons from './Components/UI/buttons.module.sass';
import BuyPage from "./pages/BuyPage";
import {getMonths} from "@skbkontur/react-ui/internal/Calendar/CalendarUtils";
import SucsesfullPage from "./pages/SucsesfullPage";
import ErrorPage from "./pages/ErrorPage";
function App() {

  let [crawItems, setCrawItems] = useState([]);
  let [btcPrice, setBtcPrice] = useState(22000);



  setInterval(()=>{
    axios.post('http://localhost:8080/', {

    })
        .then(function (response) {
            setBtcPrice(response.data['price']);
            setCrawItems(response.data['coinsLists']);
        })
        .catch(function (error) {

        });

  }, 15000)

    let [buyBox, setBuyBox] = useState({
        name: '',
        price: '',
        count: 0,
        all: 0,
        src: {},
    });



  let [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    let [signed, setSigned] = useState(false)
    useEffect(()=>{
        if(user){
            setSigned(true);
        }
        else{
            setSigned(false);
        }
    }, [user])

   setInterval(()=>{
       let data = sessionStorage.getItem('user')
       if(data){
           setUser(JSON.parse(data));
           setSigned(true);
       }
       else{
           setSigned(false);
       }
   }, 3000)


    let onChange=(obj)=>{
        setBuyBox(obj)
    }


  return (
      <div className="App">
      {/*<Header items={crawItems} sign={signed}/>*/}
          <header>
              <div className={classes.container}>
                  <a href='/' className={classes.logo}>
                      <img src={logo1} alt="Logo" className={classes['logo_img']}/>
                  </a>
                  <div className={classes.crawlLine}>
                      <div className={classes.carouseContainer}>
                          {crawItems.map((el, index) => (
                              <div className={classes['crawlLine-items']} key={index}>
                                  <span className={classes['crawlLine-items__name']}>{el.name} </span>
                                  <span className={classes['crawlLine-items__price']}>{el.price}</span>
                                  <span className={classes['crawlLine-items__gap'] + ' ' + (el.sign ? classes.green : classes.red)}>
                                      {el.sign ? '+' : ''}{el.gap}%</span>
                              </div>
                          ))}

                      </div>
                  </div>
                  <nav>
                      <a href='/market' className={classes['navbar__item']}>Market</a>
                      {/*<NavLink to='market' className={classes['navbar__item']}>Market</NavLink>*/}
                      <a href='/signin' className={buttons['border-button'] + ' ' + (signed ? classes.signed : classes.notSigned)}>Вход</a>
                      <a href='/signup' className={buttons['green-btn']  + ' ' + (signed ? classes.signed : classes.notSigned)}>Регистрация</a>
                      {signed ? <a href="/profile/person" className={buttons['green-btn']  + ' ' + (signed === true ? classes['profile-v'] : classes['profile-h'] )}>Личный кабинет</a> : <a href="" className={classes.notSigned}></a>}
                  </nav>
              </div>
          </header>

        <Routes>
            <Route path="/"/>
            <Route index element={<Main price={btcPrice}/>} />
            <Route path="signup" element={<SignUp/>} />
            <Route path="signin" element={<SignIn/>} />
            <Route path="market" element={<MarketPage onChange={onChange} />} />
            <Route path="buy" element={<BuyPage onChange={onChange} box={buyBox}/>} />
            <Route path="profile/*" element={<ProfilePage/>} />
            <Route path="card" element={<Cardpage onChange={onChange} box={buyBox}/>} />
            <Route path="successful" element={<SucsesfullPage/>} />
            <Route path="error" element={<ErrorPage/>} />
            <Route path="*" element={<Notfoundpage />} />
        </Routes>

      <Footer/>
    </div>
  );
}

export default App;

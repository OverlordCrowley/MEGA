import React, {useState} from "react";
import {Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Notfoundpage from './pages/Notfoundpage';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MarketPage from "./pages/MarketPage";
import ProfilePage from "./pages/ProfilePage.js";
import Cardpage from "./pages/Cardpage";
import BuyPage from "./pages/BuyPage";
import SucsesfullPage from "./pages/SucsesfullPage";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import Context from './Components/Context/Context';
import Preloader from "./Components/Preloader/Preloader";




function App() {
    let [buyBox, setBuyBox] = useState({
        name: '',
        price: '',
        count: 0,
        all: 0,
        src: {},
    });

    let onChange = (obj) => {
        setBuyBox(obj)
    }
    let [isActive, setIsActive] = useState(false);
    return (

        <div className="App">
            <Context.Provider value={{isActive, setIsActive}}>
                {isActive ? <Preloader/> : ''}
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Main/>}/>
                        <Route path="signup" element={<SignUp/>}/>
                        <Route path="signin" element={<SignIn/>}/>
                        <Route path="market" element={<MarketPage onChange={onChange}/>}/>
                        <Route path="buy" element={<BuyPage onChange={onChange} box={buyBox}/>}/>
                        <Route path="profile/*" element={<ProfilePage/>}/>
                        <Route path="card" element={<Cardpage onChange={onChange} box={buyBox}/>}/>
                        <Route path="successful" element={<SucsesfullPage/>}/>
                        <Route path="error" element={<ErrorPage/>}/>
                        <Route path="*" element={<Notfoundpage/>}/>
                    </Route>
                </Routes>
            </Context.Provider>
        </div>
    );
}

export default App;

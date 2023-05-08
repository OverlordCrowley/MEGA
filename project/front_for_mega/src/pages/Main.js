import React, {useState} from 'react';
import Hero from "../Components/hero/Hero";
import Pick from "../Components/pick/Pick";
import Start from "../Components/start/Start";
const Main = (props) => {


    return (
        <div>

            <Hero item={props.item} price={props.price}/>
            <Pick/>
            <Start/>

        </div>
    );
};

export default Main;
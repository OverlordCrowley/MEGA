import React, {useContext, useEffect, useState} from 'react';
import classes from './Preloader.module.sass';
import Context from "../Context/Context";
const Preloader = () => {
    let {isActive, setIsActive} = useContext(Context);
    useEffect(() => {
        if(isActive === true){

            setTimeout(() => {
                setIsActive(false);
            }, 1000);
        }


    }, [isActive]);


    return (
       <>
           <div className={classes.loaderContainer}>
               {/*<div className={classes.loader}>Loading...</div>*/}
               <div className={classes.spinner}></div>
               {/*<div className={classes.spinnerText}>Загрузка</div>*/}
           </div>)
       </>
    );
};

export default Preloader;
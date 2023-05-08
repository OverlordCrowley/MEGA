import React, {useContext, useEffect, useState, useTransition} from 'react';
import classes from "./Hero.module.sass";
import buttons from "../UI/buttons.module.sass"
import axios from "axios";

import { Canvas } from "@react-three/fiber";
import {Environment, OrbitControls, PresentationControls} from "@react-three/drei";
import { Suspense } from "react";

import {Model} from "../btc/Model";
import Context from "../Context/Context";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../../hooks/use-localstorage";
import i18n from '../../i18n';

import {MyButton} from 'kramzos-kit';

const Hero = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');


    let [price, setPrice] = useState(22000);
    let {isActive, setIsActive} = useContext(Context);

    useEffect(() => {
            setIsActive(true);
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
                {/*<MyButton color={"GREEN"}>Еуче</MyButton>*/}
             <div className={classes.mainInfo}>
              <div className="mainInfoLeft">
                  <h4 className={classes.title}>{t('HeroTitle')}</h4>
                  <p className={classes.subtitle}>{t("HeroSubtitle")}</p>
                  <div className={classes.buy}>
                      <span className={classes.text}><span className={classes.bit}>Bitcoin</span> {t("In")} USD</span>
                      <p><span className={classes.dollar}>$</span>{price}</p>
                  </div><br/>
                  <a href='/market' className={buttons['border-button'] + ' ' + classes.buyBtn}>{t('Buy')}</a>
              </div>
                 <div className={classes.mainInfoRight}>
                     <Canvas shadows>
                         <OrbitControls/>
                         <PresentationControls speed={1.5} global polar={[-0.1, Math.PI / 4]}></PresentationControls>
                         <Suspense fallback={null}>
                             <Model scale={0.5} scale={[1, 1, 1]}/>
                             <Model position={[10, 10, 10]}  scale={[1, 1, 1]}/>
                             <Model position={[7, 1, 5]}   rotation={[1,1,1]}scale={[1, 1, 1]}/>
                             <Model position={[13, 5, 10]}  scale={[1, 1, 1]}/>
                             <Model position={[17, 10, 15]}   rotation={[1,1,1]} scale={[1, 1, 1]}/>
                             <Model position={[22, 15, 20]}   rotation={[1,1,1]} scale={[1, 1, 1]}/>
                             <Model position={[-7, 0, 0]}  scale={[1, 1, 1]}/>
                             <Model position={[0, 0, -10]}  rotation={[1,1,1]}  scale={[1, 1, 1]}/>
                             <Model position={[3, 5, -10]}  scale={[1, 1, 1]}/>
                             <Model position={[3, -5, -10]}  scale={[1, 1, 1]}/>
                             <Model position={[-3, 5, -10]}  scale={[1, 1, 1]}/>
                             <Model position={[5, 8, -10]} rotation={[2,2,2]}  scale={[1, 1, 1]}/>
                             <Model position={[-6, 12, -10]}  scale={[1, 1, 1]}/>
                             <Model position={[-3, -5, -10]}  rotation={[1,1,1]} scale={[1, 1, 1]}/>
                             <Model position={[-6, -5, -10]} rotation={[1,1,1]}  scale={[1, 1, 1]}/>
                             <Model position={[-3, 0, 2]} rotation={[1,1,1]}  scale={[1, 1, 1]}/>
                             <Environment preset={"forest"}  />



                         </Suspense>
                     </Canvas>
                 </div>
             </div>

            </div>
        </section>
    );
};

export default Hero;
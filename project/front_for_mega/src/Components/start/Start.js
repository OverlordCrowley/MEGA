import classes from "./Start.module.sass";
import user from "./user.svg";
import card from "./card.svg";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../../hooks/use-localstorage";
import i18n from '../../i18n';
import crypt from "./bitcoin.svg";
const Start = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    return (
        <section className={classes.start}>
            <div className={classes.container + " " + classes.containerSmall}>
                <h4 className={classes.title}>{t('StartTitle')}</h4>
                <p className={classes.subtitle}>{t('StartTSubtitle')}</p>
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
                             <p className={classes['startList-item__text']}>1. {t('StartStep1')}</p>
                         </div>
                         <div className={classes['startList-item']}>
                             <img src={card} alt="Card icon" className={classes['startList-item__img']} />
                             <p className={classes['startList-item__text']}>2. {t('StartStep2')}</p>
                         </div>
                         <div className={classes['startList-item']}>
                             <img src={crypt} alt="Crypt icon" className={classes['startList-item__img']} />
                             <p className={classes['startList-item__text']}>3. {t('StartStep3')}</p>
                         </div>

                     </div>
                 </div>
             </div>
            </div>
        </section>
    );
};

export default Start;
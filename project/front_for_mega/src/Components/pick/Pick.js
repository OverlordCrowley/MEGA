import classes from "./Pick.module.sass";
import buttons from "../UI/buttons.module.sass";
import { useTranslation } from 'react-i18next';
import useLocalStorage from "../../hooks/use-localstorage";
import i18n from '../../i18n';
const Pick = (props) => {
    const { t } = useTranslation();
    const [language, setLanguage] = useLocalStorage('language', 'ru');
    return (
        <section className={classes.pick}>
            <div className={classes.container}>
                <h4 className={classes.title}>{t("PickTitle")}</h4>
             <div className={classes.pickContainer}>
                 <ul className={classes.list}>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>{t('PickSubtext1')}</span> {t('Picktext1')}</span></li>
                     <li className={classes['list__item']}><span>{t('Picktext2')} <span className={classes.lightGreen}>{t('PickSubtext2')}</span></span></li>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>{t('PickSubtext3')}</span> {t('Picktext3')}</span>
                     </li>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>{t('PickSubtext4')}</span> {t('Picktext4')}</span></li>
                 </ul>
                 <ul className={classes.list}>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>{t('PickSubtext5')}</span> {t('Picktext5')}</span></li>
                     <li className={classes['list__item']}><span>{t('PickSubtext6')} <span className={classes.lightGreen}>{t('Picktext6')}</span></span></li>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>{t('PickSubtext7')}</span> {t('Picktext7')}</span>
                     </li>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>{t('PickSubtext8')}</span> {t('Picktext8')}</span></li>
                 </ul>
             </div>
            </div>
        </section>
    );
};

export default Pick;
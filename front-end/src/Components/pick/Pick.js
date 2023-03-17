import classes from "./Pick.module.sass";
import buttons from "../UI/buttons.module.sass"
const Pick = (props) => {

    return (
        <section className={classes.pick}>
            <div className={classes.container}>
                <h4 className={classes.title}>Почему MEGA — прекрасный выбор?</h4>
             <div className={classes.pickContainer}>
                 <ul className={classes.list}>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>15+</span> видов обмениваемых токенов</span></li>
                     <li className={classes['list__item']}><span>Узкие <span className={classes.lightGreen}>спреды</span></span></li>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>Конкурентные комиссии.</span> Никаких скрытых сборов</span>
                     </li>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>Детально проработанное регулирование.</span> Соответствие мировым AML и KYC стандартам</span></li>
                 </ul>
                 <ul className={classes.list}>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>450+</span> положительных отзывов</span></li>
                     <li className={classes['list__item']}><span>Лучший <span className={classes.lightGreen}>контроль волатильности</span></span></li>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>Быстрый отклик</span> технической поддержки</span>
                     </li>
                     <li className={classes['list__item']}><span><span className={classes.lightGreen}>Все данные</span> хранятся в зашифрованном формате</span></li>
                 </ul>
             </div>
            </div>
        </section>
    );
};

export default Pick;
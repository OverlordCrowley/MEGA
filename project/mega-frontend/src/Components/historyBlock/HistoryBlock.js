import React, {useEffect, useState} from 'react';
import classes from "./HistoryBlock.module.sass"
import buttons from "../UI/buttons.module.sass"
import person from '../../images/user.svg'
import axios from "axios";
const HistoryBlock = (props) => {
    let [edit, setEdit] = useState(false);
    let [history, setHistory] = useState([]);
    let data = JSON.parse(sessionStorage.getItem('user'));
    useEffect(()=>{
        axios.post('http://localhost:8080/profile/history', {
            email: data['email'],
            pass: data['pass'],
        })
            .then(function (response) {
                setHistory(response.data)
            })
            .catch(function (error) {

            });
    },[])
    let [user, setUser] = useState(props.user);

    return (
        <div className={classes.mainBlock}>
            <div className={classes.mainInfo}>
                <img src={person} className={classes['mainInfo__img']}/>
                <p className={classes['mainInfo__text']}>{user.userName}</p>
            </div>
            <div className={classes.tableHead}>
              <table className={classes.Heead}>
                  <thead>
                  <tr className={classes.historyRow}>
                      <th className={classes.historyColumns}>id</th>
                      <th className={classes.historyColumns}>date</th>
                      <th className={classes.historyColumns}>wallet</th>
                      <th className={classes.historyColumns}>crypt</th>
                      <th className={classes.historyColumns}>count</th>
                  </tr>
                  </thead>
              </table>
            </div>
            <table className={classes.historyTable}>
                <tbody>
                {history.map((el,index)=>(
                    <tr className={classes.historyRow} key={index}>
                        <td className={classes.historyData}>{el.id}</td>
                        <td className={classes.historyData}>{el.date}</td>
                        <td className={classes.historyData}>{el['nameWallet']}</td>
                        <td className={classes.historyData}>{el['nameCrypt']}</td>
                        <td className={classes.historyData}>{el.count}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
};

export default HistoryBlock;
import styles from "./Header.module.css";

import React, { useEffect, useContext } from "react";
import { MyContextProvider } from "../Context/Context";

const Header = () => {
    let { ukr, setUkr, usd, setUsd, eur, setEur, myData } = useContext(MyContextProvider);

    const getActualExchangeRate = (currencyName) => {
        let result;
        for (const key in myData) {
            if (Object.hasOwnProperty.call(myData, key)) {
                if (key == currencyName) {
                    result = myData[key];
                } 
            }
        }
        return result;
    };

    ukr = getActualExchangeRate('UAH');
    usd = getActualExchangeRate('USD');
    eur = getActualExchangeRate('EUR');

    useEffect(() => {
        setUsd(usd);
        setEur(eur);
        setUkr(ukr);
    }, [usd, eur, ukr]);

    return (
        <header className={styles.header}>
            <h3 className={styles.title}>Конвертер валют</h3>
            <p className={styles.subtext}>Данные по обменным курсам до 19.12.2022</p>
            <div className={styles.currencies}>
                <p>1 UAH = {(1 / ukr).toFixed(3)} USD</p>
                <p>1 UAH = {(1 / ukr * eur).toFixed(3)} EUR</p>
            </div>
        </header>
    )
}

export default Header;
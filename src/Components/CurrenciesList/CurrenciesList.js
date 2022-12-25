import styles from "./CurrenciesList.module.css";

import React, { useContext } from "react";
import { MyContextProvider } from "../Context/Context";

const CurrenciesList = (props) => {
    let { myData } = useContext(MyContextProvider);

    let currencies = [];
    for (const currency in myData) {
        if (Object.hasOwnProperty.call(myData, currency)) {
            currencies.push(currency);
        }
    }

    const clickNewCurrencyHandler = (event) => {
        props.newCurrency(event.target.textContent);
        props.isOpenList(false);
    }

    return (
        <section className={styles.list}>
            {currencies.map((currency, id) => {
                return (
                    <button key={id} className={styles.currency} onClick={clickNewCurrencyHandler}>
                        {currency}
                    </button>
                );
            })}
        </section>
    )
}

export default CurrenciesList;
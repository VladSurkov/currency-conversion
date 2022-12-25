import styles from "./Converter.module.css";

import React, { useContext, useState, useEffect } from "react";
import { MyContextProvider } from "../Context/Context";

import CurrenciesList from "../CurrenciesList/CurrenciesList";
import CurrenciesList2 from "../CurrenciesList2/CurrenciesList2";

const Converter = () => {
    let { myData } = useContext(MyContextProvider);

    let [firstPopularCurrencies, setFirstPopularCurrencies] = useState(['USD', 'UAH', 'EUR']);
    let [secondPopularCurrencies, setSecondPopularCurrencies] = useState(['USD', 'UAH', 'EUR']);

    let [equivalentCurrency1, setEquivalentCurrency1] = useState(0);
    let [equivalentCurrency2, setEquivalentCurrency2] = useState(0);

    let [firstSelect, setFirstSelect] = useState('USD');
    let [secondSelect, setSecondSelect] = useState('USD');

    let [firstInput, setFirstInput] = useState(0);
    let [secondInput, setSecondInput] = useState(0);

    const [isFirstInputChanged, setIsFirstInputChanged] = useState(false);
    const [isSecondInputChanged, setIsSecondInputChanged] = useState(false);

    const [isFirstCurrenciesListOpen, setIsFirstCurrenciesListOpen] = useState(false);
    const [isSecondCurrenciesListOpen, setIsSecondCurrenciesListOpen] = useState(false);

    let [firstNewCurrency, setFirstNewCurrency] = useState(null);
    let [secondNewCurrency, setSecondNewCurrency] = useState(null);

    const firstCurrencyHandler = (event) => {
        setFirstSelect(event.target.textContent);
    }

    const secondCurrencyHandler = (event) => {
        setSecondSelect(event.target.textContent);
    }

    const changeFirstInputHandler = (e) => {
        firstInput = e.target.value;
        setFirstInput(firstInput);
        if (isFirstInputChanged === false) {
            setIsFirstInputChanged(true);
        } else {
            setIsFirstInputChanged(false);
        }
    }

    const changeSecondInputHandler = (e) => {
        secondInput = e.target.value;
        setSecondInput(secondInput);
        if (isSecondInputChanged === false) {
            setIsSecondInputChanged(true);
        } else {
            setIsSecondInputChanged(false);
        }
    }

    const openFirstCurrenciesListHandler = () => {
        if (isFirstCurrenciesListOpen === true) {
            setIsFirstCurrenciesListOpen(false);
        } else {
            setIsFirstCurrenciesListOpen(true);
        }
    }

    const openSecondCurrenciesListHandler = () => {
        if (isSecondCurrenciesListOpen === true) {
            setIsSecondCurrenciesListOpen(false);
        } else {
            setIsSecondCurrenciesListOpen(true);
        }
    }

    const newCurrencyHandler = (e) => {
        firstNewCurrency = e;
        setFirstNewCurrency(firstNewCurrency);
        
        let indexOfCurrency = firstPopularCurrencies.indexOf(firstSelect);
        firstPopularCurrencies.splice(indexOfCurrency, 1, firstNewCurrency);
        setFirstPopularCurrencies(firstPopularCurrencies);
        setFirstSelect(firstNewCurrency);
    }

    const newSecondCurrencyHandler = (e) => {
        secondNewCurrency = e;
        setSecondNewCurrency(secondNewCurrency);
        
        let indexOfCurrency = secondPopularCurrencies.indexOf(secondSelect);
        secondPopularCurrencies.splice(indexOfCurrency, 1, secondNewCurrency);
        setSecondPopularCurrencies(secondPopularCurrencies);
        setSecondSelect(secondNewCurrency);
    }

    useEffect(() => {
        if (firstSelect != secondSelect) {
            if (firstSelect != 'USD') {
                const divider = myData[firstSelect];
                for (const key in myData) {
                    if (Object.hasOwnProperty.call(myData, key)) {
                        if (key === secondSelect.toUpperCase()) { 
                            if (divider > 0) {
                                secondInput = firstInput / divider * myData[key];
                                setSecondInput(secondInput.toFixed(2));
                            } else {
                                secondInput = firstInput * divider * myData[key];
                                setSecondInput(secondInput.toFixed(2));
                            }
                            
                        }
                    }
                }
            } else {
                for (const key in myData) {
                    if (Object.hasOwnProperty.call(myData, key)) {
                        if (key === secondSelect.toUpperCase()) {
                            secondInput = firstInput * myData[key];
                            setSecondInput(secondInput.toFixed(2));
                        }
                    }
                }
            }
        } else {
            setSecondInput(firstInput);
        }
    }, [isFirstInputChanged]);

    useEffect(() => {
        if (secondSelect != firstSelect) {
            if (secondSelect != 'USD') {
                const divider = myData[secondSelect];
                for (const key in myData) {
                    if (Object.hasOwnProperty.call(myData, key)) {
                        if (key === firstSelect.toUpperCase()) { 
                            if (divider > 0) {
                                firstInput = secondInput / divider * myData[key];
                                setFirstInput(firstInput.toFixed(2));
                            } else {
                                firstInput = secondInput * divider * myData[key];
                                setSecondInput(firstInput.toFixed(2));
                            }
                            
                        }
                    }
                }
            } else {
                for (const key in myData) {
                    if (Object.hasOwnProperty.call(myData, key)) {
                        if (key === firstSelect.toUpperCase()) {
                            firstInput = secondInput * myData[key];
                            setFirstInput(firstInput.toFixed(2));
                        }
                    }
                }
            }
        } else {
            setFirstInput(secondInput);
        }
    }, [isSecondInputChanged]);

    useEffect(() => {
        if (isSecondInputChanged === false) {
            setIsSecondInputChanged(true);
        } else {
            setIsSecondInputChanged(false);
        }
        let divider;
        if (firstSelect === secondSelect) {
            setEquivalentCurrency1(1);
            setEquivalentCurrency2(1);
        } else if (secondSelect === 'USD') {
            let result = myData[secondSelect] / myData[firstSelect];
            setEquivalentCurrency1(result.toFixed(3));
            setEquivalentCurrency2(myData[firstSelect].toFixed(3));
        } else {
            divider = myData[secondSelect];
            let result = 1 / myData[firstSelect] * divider;
            setEquivalentCurrency1(result.toFixed(3));
            setEquivalentCurrency2((1 / divider * myData[firstSelect]).toFixed(3));
        }   
    }, [firstSelect]);

    useEffect(() => {
        if (isFirstInputChanged === false) {
            setIsFirstInputChanged(true);
        } else {
            setIsFirstInputChanged(false);
        }
        let divider;
        if (secondSelect === firstSelect) {
            setEquivalentCurrency1(1);
            setEquivalentCurrency2(1);
        } else if (firstSelect === 'USD') {
            let result = myData[firstSelect] / myData[secondSelect];
            setEquivalentCurrency1(myData[secondSelect].toFixed(3));
            setEquivalentCurrency2(result.toFixed(3));
        } else {
            divider = myData[firstSelect];
            let result = 1 / myData[secondSelect] * divider;
            setEquivalentCurrency1((1 / divider * myData[secondSelect]).toFixed(3));
            setEquivalentCurrency2(result.toFixed(3));
        }
    }, [secondSelect]);

    return (
        <main className={styles.converter}>
            <div className={styles.converter__content}>
                <div className={styles.converter__item}>
                    <div className={styles.selectCurrency}>
                        {firstPopularCurrencies.map((currency, id) => {
                            return <button key={id} onClick={firstCurrencyHandler} className={firstSelect === currency ? styles.selectCurrency__button_active : styles.selectCurrency__button}>{currency}</button>
                        })}
                        <button className={isFirstCurrenciesListOpen === true ? styles.selectCurrency__button_active : styles.selectCurrency__button} onClick={openFirstCurrenciesListHandler}><p style={isFirstCurrenciesListOpen === true ? {transform: 'rotate(180deg)', transition: 'all 0.3s ease'} : {transition: 'all 0.3s ease'}}>&#5167;</p></button>
                    </div>
                    <input value={firstInput} onChange={changeFirstInputHandler} className={styles.input}/>
                    <p>1 {firstSelect} = {equivalentCurrency1} {secondSelect}</p>
                    {isFirstCurrenciesListOpen === true ? <CurrenciesList newCurrency={newCurrencyHandler} isOpenList={setIsFirstCurrenciesListOpen}/> : null}
                </div>
                <div className={styles.converter__item}>
                    <div className={styles.selectCurrency}>
                        {secondPopularCurrencies.map((currency, id) => {
                            return <button key={id} onClick={secondCurrencyHandler} className={secondSelect === currency ? styles.selectCurrency__button_active : styles.selectCurrency__button}>{currency}</button>
                        })}
                        <button className={isSecondCurrenciesListOpen === true ? styles.selectCurrency__button_active : styles.selectCurrency__button} onClick={openSecondCurrenciesListHandler}><p style={isSecondCurrenciesListOpen === true ? {transform: 'rotate(180deg)', transition: 'all 0.3s ease'} : {transition: 'all 0.3s ease'}}>&#5167;</p></button>
                    </div>
                    <input value={secondInput} onChange={changeSecondInputHandler} className={styles.input}/>
                    <p>1 {secondSelect} = {equivalentCurrency2} {firstSelect}</p>
                    {isSecondCurrenciesListOpen === true ? <CurrenciesList2 newCurrency={newSecondCurrencyHandler} isOpenList={setIsSecondCurrenciesListOpen}/> : null}
                </div>
            </div>
        </main>
    )
}

export default Converter;
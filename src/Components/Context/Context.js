import { createContext, useState, useEffect } from 'react';

export const MyContextProvider = createContext();

const MyContext = (props) => {

    const [myData, setMyData] = useState({});

    useEffect (() => {
        fetch(`https://v6.exchangerate-api.com/v6/ea8941dc086a6d333227b5dc/latest/USD`)
            .then(response => {return response.json();})
            .then((data) => {
                setMyData(data.conversion_rates);
            });
    }, []);

    const [ukr, setUkr] = useState(0);
    const [usd, setUsd] = useState(0);
    const [eur, setEur] = useState(0);

    return (
        <MyContextProvider.Provider value={{ukr, setUkr, usd, setUsd, eur, setEur, myData}}>
            {props.children}
        </MyContextProvider.Provider>
    );
};

export default MyContext;
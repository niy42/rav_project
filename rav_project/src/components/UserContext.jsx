// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [searchItem, setSearchItem] = useState('');
    const [timeInterval, setTimeInterval] = useState('1m');
    const [tradingPairs, setTradingPairs] = useState(['BTC/USD', 'ETH/USD', 'LTC/USD']);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            searchItem,
            setSearchItem,
            timeInterval,
            setTimeInterval,
            tradingPairs,
            setTradingPairs
        }}>
            {children}
        </UserContext.Provider>
    );
};

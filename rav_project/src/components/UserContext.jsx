// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [searchItem, setSearchItem] = useState('');
    const [timeInterval, setTimeInterval] = useState('1m');
    const [tradingPairs, setTradingPairs] = useState(['BTC/USD', 'ETH/USD', 'LTC/USD']);
    const [showAlert, setShowAlert] = useState({ status: false, type: '', message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timer = null;
        if (showAlert?.status) {
            timer = setTimeout(() => (
                setShowAlert({ status: false, type: '', message: '' })
            ), 2000);
        }
        return () => clearTimeout(timer);
    }, [showAlert]);

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
            setTradingPairs,
            loading,
            setLoading,
            showAlert,
            setShowAlert
        }}>
            {children}
        </UserContext.Provider>
    );
};

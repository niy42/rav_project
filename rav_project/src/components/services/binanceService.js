// src/services/binanceService.js

import axios from 'axios';

const API_URL = 'https://api.binance.com/api/v3';
//https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=1000
///api/v3/ticker/tradingDay

export const getTradingPairs = async () => {
    const response = await axios.get(`${API_URL}/ticker/24hr`);
    return response.data;
};

export const getOrderBook = async (symbol) => {
    const response = await axios.get(`${API_URL}/depth?symbol=${symbol}&limit=1000`) //{ params: { symbol, limit: 100 } });
    return response.data;
};

export const getCandlestickData = async (symbol, interval = '1d') => {
    const response = await axios.get(`${API_URL}/klines?symbol=${symbol}&${interval}&limit=1000`);
    return response.data;
};

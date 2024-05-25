// src/services/coinGeckoService.js
import axios from 'axios';

const COINGECKO_API = import.meta.env.COINGECKO_API;

const API_URL = 'https://api.coingecko.com/api/v3';

export const getTradingPairs = async () => {
    const response = await axios.get(`${API_URL}/coins/markets`, {
        params: {
            vs_currency: 'usd'
        }
    });
    return response.data;
};

export const getOrderBook = async (id) => {
    // CoinGecko does not provide order book data, so we'll simulate this
    // For actual order book data, you would need to use another API like Binance
    return {
        bids: [],
        asks: []
    };
};



export const getCandlestickData = async (id) => {
    const options = {
        method: 'GET',
        url: `${API_URL}/coins/${id}/ohlc`,
        params: { vs_currency: 'usd', days: '30' },
        headers: { accept: 'application/json', 'x-cg-demo-api-key': COINGECKO_API }
    };

    const response = await axios.request(options);
    return response.data;
};
//${API_URL}/coins/${id}/market_chart https://api.coingecko.com/api/v3/coins/{id}/ohlc
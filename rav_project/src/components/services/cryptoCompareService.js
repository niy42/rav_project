import axios from "axios";

const API_KEY = import.meta.env.CRYPTO_COMPARE_API;
const BASE_URL = 'https://min-api.cryptocompare.com/data';

export const getOrderBook = async (fsym, tsym) => {
    try {
        const response = await axios.get(`${BASE_URL}/ob/l2/top`, {
            params: {
                fsym: fsym,
                tsym: tsym,
                api_key: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order book data:', error);
        throw error;
    }
};
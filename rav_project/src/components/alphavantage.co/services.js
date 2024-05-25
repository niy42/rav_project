import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;

export const getStockData = async (symbol) => {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`);
        const { data } = response;

        // Check if the data contains the expected properties
        if (data && data['Weekly Adjusted Time Series']) {
            return data;
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw error;
    }
};

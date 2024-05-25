// src/components/OrderBook.js

import React, { useEffect, useState } from 'react';
import { getOrderBook } from '../services/binanceService';

const OrderBook = ({ symbol }) => {
    const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });

    useEffect(() => {
        const fetchOrderBook = async () => {
            const data = await getOrderBook(symbol);
            setOrderBook(data);
        };

        fetchOrderBook();
    }, [symbol]);

    return (
        <div>
            <h2>Order Book</h2>
            <div>
                <h3>Bids</h3>
                <ul>
                    {orderBook.bids.map((bid, index) => (
                        <li key={index}>{bid[0]}: {bid[1]}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Asks</h3>
                <ul>
                    {orderBook.asks.map((ask, index) => (
                        <li key={index}>{ask[0]}: {ask[1]}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrderBook;

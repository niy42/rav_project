import React, { useEffect, useState } from 'react';
import { getOrderBook } from '../services/cryptoCompareService';

const OrderBook = ({ fsym, tsym }) => {
    const [orderBook, setOrderBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderBook = async () => {
            setLoading(true);
            try {
                const data = await getOrderBook(fsym, tsym);
                setOrderBook(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderBook();
    }, [fsym, tsym]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='-mt-32 flex flex-col'>
            <h2 className='text-base text-gray-300'>Order Book for {fsym}/{tsym}</h2>
            {orderBook && (
                <div className='space-y-4 mt-4'>
                    {/*<h3 className='text-base text-gray-300'>Bids</h3>*/}
                    <ul>
                        {orderBook.Bids ? orderBook.Bids.map((bid, index) => (
                            <li key={index}>Price: {bid.P}, Quantity: {bid.Q}</li>
                        )) : (
                            <div className='text-base text-gray-300'>No Bids Available</div>
                        )}
                    </ul>
                    {/*<h3 className='text-base text-gray-300'>Asks</h3>*/}
                    <ul>
                        {orderBook.Asks ? orderBook.Asks.map((ask, index) => (
                            <li key={index}>Price: {ask.P}, Quantity: {ask.Q}</li>
                        )) : <div className='text-base text-gray-300'>No Asks Available</div>}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrderBook;

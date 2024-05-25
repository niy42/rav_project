// TradingPairsList.js
import React, { useEffect, useState } from 'react';
import { getTradingPairs } from '../services/coinGeckoService';
import { useUser } from '../UserContext';

const TradingPairsList = () => {
    const [tradingPairs, setTradingPairs] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const { searchItem } = useUser();

    useEffect(() => {
        setIsLoading(true);
        const fetchTradingPairs = async () => {
            try {
                const pairs = await getTradingPairs();
                console.log('Sample pair:', pairs[0]); // Log the structure of a sample pair
                setTradingPairs(pairs);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTradingPairs();
    }, []);

    const filteredPairs = tradingPairs.filter(pair =>
        pair.symbol.toLowerCase().includes(searchItem?.toLowerCase() || '')
    );

    return (
        <>
            {loading ? (
                <div className='text-base text-white'>Loading...</div>
            ) : (
                <div className="flex flex-col h-64 overflow-y-auto bg-[#20252B] p-4 rounded-lg hide-scrollbar">
                    <ul className="flex flex-col space-y-2">
                        {filteredPairs.map(pair => (
                            <li
                                className="p-1 bg-[#20252B] hover:bg-gray-600 rounded cursor-pointer text-gray-300 text-xs"
                                key={pair.id}
                            >
                                {pair.symbol}: ${pair.current_price.toFixed(2)} (Volume: {pair.total_volume.toLocaleString()})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default TradingPairsList;

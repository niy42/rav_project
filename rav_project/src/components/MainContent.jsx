import React, { useState, useEffect } from 'react';
import CandlestickMobile from './candlestickchart/CandlestickMobile'
import CandlestickChart from './candlestickchart/CandlestickChart';
import TradingPairsList from './tradingpairslist/TradingPairsList';
import OrderBook from './orderbook/OrderBook';
import { useUser } from './UserContext';
//import axios from 'axios';

function MainContent() {
    //const [candlestickData, setCandlestickData] = useState({});
    //const [tradingPairs, setTradingPairs] = useState([]);
    //const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
    const [activeTab, setActiveTab] = useState('chart');
    const [isMobile, setIsMobile] = useState(false);
    const [miniTab, setMiniTab] = useState('orderbook');
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const { timeInterval, setTimeInterval } = useUser();

    const handlePriceChange = (e) => {
        const newPrice = parseFloat(e.target.value);
        setPrice(newPrice);
        setTotal(newPrice * amount);
    }

    const handleAmountChange = (e) => {
        const newAmount = parseFloat(e.target.value);
        setAmount(newAmount);
        setTotal(newAmount * price);
    }

    useEffect(() => {
        /*// Fetch candlestick data
        axios.get('/api/candlestick').then(response => {
            setCandlestickData(response.data);
            console.log("Data response: ", response.data);
        });

        // Fetch trading pairs
        axios.get('/api/trading-pairs').then(response => {
            setTradingPairs(response.data);
        });

        // Fetch order book data
        axios.get('/api/order-book').then(response => {
            setOrderBook(response.data);
        });*/

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'chart':
                return (
                    <div className="main-content__section-content--chart-mobile">
                        <CandlestickMobile id={'bitcoin'} />
                    </div>
                );
            case 'orderbook':
                return (
                    <div className="main-content__section-content--orderbook-mobile">
                        <p>Order Book</p>
                    </div>
                );
            case 'tradingPairs':
                return (
                    <div className="main-content__section-content--trading-pairs-mobile">
                        <TradingPairsList />
                    </div>
                );
            default:
                return null;
        }
    };

    const renderMiniContent = () => {
        switch (miniTab) {
            case 'orderbook':
                return (
                    <div className="main-content__mini-content--orderbook">
                        <OrderBook data={''} />
                    </div>
                );
            case 'tradingPairs':
                return (
                    <div className="main-content__mini-content--trading-pairs">
                        <TradingPairsList />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="main-content">
            {isMobile ? (
                <>
                    <nav className="main-content__navbar">
                        <div className='main-content__navbar-container'>
                            <button
                                onClick={() => setActiveTab('chart')}
                                className={`main-content__navbar-button ${activeTab === 'chart' ? 'bg-[#262932]' : 'bg-gray-700'}`}
                            >
                                Chart
                            </button>
                            <button
                                onClick={() => setActiveTab('orderbook')}
                                className={`main-content__navbar-button ${activeTab === 'orderbook' ? 'bg-[#262932]' : 'bg-gray-700'}`}
                            >
                                Order
                            </button>
                            <button
                                onClick={() => setActiveTab('tradingPairs')}
                                className={`main-content__navbar-button ${activeTab === 'tradingPairs' ? 'bg-[#262932]' : 'bg-gray-700'}`}
                            >
                                Trading
                            </button>
                        </div>
                    </nav>
                    <div className="main-content__content">
                        <h2 className="main-content__content-title">
                            {activeTab === 'chart' && 'BTC/USDT' && (
                                <>
                                    <div className='flex space-x-1'>
                                        <h2 className="main-content__section-title flex-[0.3]">BTC/USDT</h2>

                                        <div className='flex space-x-2 text -mt-4 flex-[0.5]'>
                                            <button className='text-white text-base' onClick={() => setTimeInterval('1m')}>1m</button>
                                            <button className='text-white text-base' onClick={() => setTimeInterval('5m')}>5m</button>
                                            <button className='text-white text-base' onClick={() => setTimeInterval('15m')}>15m</button>
                                            <button className='text-white text-base' onClick={() => setTimeInterval('1h')}>1h</button>
                                            <button className='text-white text-base' onClick={() => setTimeInterval('1d')}>1d</button>
                                        </div>
                                    </div>
                                </>)}
                            {activeTab === 'orderbook' && 'Order Book'}
                            {activeTab === 'tradingPairs' && 'Trading Pairs'}
                        </h2>
                        {renderContent()}
                    </div>
                </>
            ) : (
                <>
                    <div className="main-content__section--candlestick">
                        <div className='flex space-x-4'>
                            <h2 className="main-content__section-title flex-[1] ">BTC/USDT</h2>
                            <div className='-mt-0 space-x-8 '>
                                <button className={`mx-1 font-bold transition duration-300 hover:text-gray-400 text-xs px-2 py-1 rounded-md text-gray-200 ${timeInterval === '1m' ? 'bg-[#262932]' : 'bg-gray-700'}`} onClick={() => setTimeInterval('1m')}>1m</button>
                                <button className={`mx-1 font-bold transition duration-300 hover:text-gray-400 text-xs px-2 py-1 rounded-md text-gray-200 ${timeInterval === '5m' ? 'bg-[#262932]' : 'bg-gray-700'}`} onClick={() => setTimeInterval('5m')}>5m</button>
                                <button className={`mx-1 font-bold transition duration-300 hover:text-gray-400 text-xs px-2 py-1 rounded-md text-gray-200 ${timeInterval === '15m' ? 'bg-[#262932]' : 'bg-gray-700'}`} onClick={() => setTimeInterval('15m')}>15m</button>
                                <button className={`mx-1 font-bold transition duration-300 hover:text-gray-400 text-xs px-2 py-1 rounded-md text-gray-200 ${timeInterval === '1h' ? 'bg-[#262932]' : 'bg-gray-700'}`} onClick={() => setTimeInterval('1h')}>1h</button>
                                <button className={`mx-1 font-bold transition duration-300 hover:text-gray-400 text-xs px-2 py-1 rounded-md text-gray-200 ${timeInterval === '1d' ? 'bg-[#262932]' : 'bg-gray-700'}`} onClick={() => setTimeInterval('1d')}>1d</button>

                            </div>
                        </div>
                        <div id="chart" className="main-content__section-content--chart1">
                            <CandlestickChart id={'bitcoin'} />
                        </div>
                    </div>
                    <div className="main-content__section-content--orderbook-trading-pair">
                        <nav className="main-content__mini-navbar">
                            <div className='main-content__mini-navbar-container'>
                                <button
                                    onClick={() => setMiniTab('orderbook')}
                                    className={`flex-1 py-1 px-2 mx-1 text-xs rounded-md text-white hover:text-gray-400 transition duration-300 ${miniTab === 'orderbook' ? 'bg-[#262932]' : 'bg-gray-700'}`}
                                >
                                    Order Book
                                </button>
                                <button
                                    onClick={() => setMiniTab('tradingPairs')}
                                    className={`flex-1 py-1 px-2 mx-1 rounded-md text-xs text-white hover:text-gray-400 transition duration-300 ${miniTab === 'tradingPairs' ? 'bg-[#262932]' : 'bg-gray-700'}`}
                                >
                                    Trading Pairs
                                </button>
                            </div>
                        </nav>
                        {renderMiniContent()}
                    </div>
                </>
            )}
            <div className="bg-[#17181B] p-6 rounded-lg flex-[0.4] h-full">
                <h2 className="text-xl mb-4 text-gray-200">Place Order</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="price" className="block mb-1 text-gray-200">Price</label>
                        <input onChange={handlePriceChange} value={price} type="text" id="price" name="price" className="w-full h-7 p-2 rounded-md text-white bg-[#20252B]" />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block mb-1 text-gray-200">Amount</label>
                        <input onChange={handleAmountChange} value={amount} type="text" id="amount" name="amount" className="w-full h-7 p-2 rounded-md text-white bg-[#20252B]" />
                    </div>
                    <div>
                        <label htmlFor="total" className="block mb-1 text-gray-200">Total</label>
                        <input type="text" id="total" name="total" readOnly className="w-full h-7 p-2 rounded-md text-white text-base bg-gray-700" value={total} />
                    </div>
                    <div className="flex items-center p-2 justify-center space-x-12">
                        <button
                            type="button"
                            className="bg-[#0c0c14] focus:outline-none focus:border-2 focus:border-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md text-xs"
                        >
                            Buy BTC
                        </button>
                        <button type="button"
                            className="bg-[#0c0c14] focus:outline-none focus:border-2 focus:border-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md text-xs">
                            Sell BTC
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default MainContent;
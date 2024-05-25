// src/components/CandlestickChart.js

import React, { useEffect, useState, useMemo } from 'react';
import { getCandlestickData } from '../services/coinGeckoService';
import ReactApexChart from 'react-apexcharts';
import { formatData } from './utility';

const CandlestickMobile = ({ id }) => {
    const [candlestickData, setCandlestickData] = useState([]);

    useEffect(() => {
        const fetchCandlestickData = async () => {
            const data = await getCandlestickData(id);
            setCandlestickData(data);
            console.log(data);
        };

        fetchCandlestickData();
    }, [id]);

    const options = {
        chart: {
            type: 'candlestick',
            height: '100%',
            width: '100%',
            toolbar: {
                show: true,
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350,
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            height: '100%',  // Ensure it covers the container
                            width: '100%',
                        },
                    },
                },
                {
                    breakpoint: 768,
                    options: {
                        chart: {
                            height: '100%',
                            width: '100%',
                        },
                    },
                },
                {
                    breakpoint: 1024,
                    options: {
                        chart: {
                            height: '100%',
                            width: '100%',
                        },
                    },
                },
            ],
        },
        // Other chart options...
    };

    /*const seriesData = useMemo(() => {
        return candlestickData.map(item => ({
            x: new Date(item[0]),
            y: [item[1], item[2], item[3], item[4]]
        }));
    }, [candlestickData]);*/

    const seriesData = useMemo(() => formatData(candlestickData), [candlestickData]);
    console.log(seriesData);

    return (
        <div>
            {/*<h2>Candlestick Chart</h2>*/}
            <ReactApexChart
                series={[{ data: seriesData }]}
                options={options}
                type='candlestick'
                className='min-w-64 h-32 relative right-3'
            />
        </div>
    );
};

export default CandlestickMobile;

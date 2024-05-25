// src/components/CandlestickChart.js

import React, { useEffect, useState, useMemo } from 'react';
import { getCandlestickData } from '../services/coinGeckoService';
import ReactApexChart from 'react-apexcharts';
import { formatData } from './utility';
import { useUser } from '../UserContext';

const CandlestickChart = ({ id }) => {
    const [candlestickData, setCandlestickData] = useState([]);
    const { setShowAlert } = useUser();

    useEffect(() => {
        const fetchCandlestickData = async () => {
            try {
                const data = await getCandlestickData(id);
                if (data) {
                    setCandlestickData(data);
                    setShowAlert({
                        status: true,
                        type: 'success',
                        message: 'Fetching successful'
                    });
                } else {
                    setShowAlert({
                        status: true,
                        type: 'info',
                        message: 'No data available'
                    });
                }
            } catch (error) {
                setShowAlert({ status: true, type: 'info', message: `${error?.message} ...` });
            }
        };

        fetchCandlestickData();
    }, [id, setShowAlert]);


    /*useEffect(() => {
        if (!candlestickData.length) {
            console.log('No data found');
            setShowAlert({ status: true, type: 'info', mesage: 'No data available' })
        }
}, [candlestickData]);*/

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

    const seriesData = useMemo(() => formatData(candlestickData), [candlestickData]);
    console.log(seriesData);

    return (
        <div>
            <ReactApexChart
                series={[{ data: seriesData }]}
                options={options}
                type='candlestick'
                className='min-w-64 h-32 relative right-3'
                width={500}
                height={150}
            />
        </div>
    );
};

export default CandlestickChart;

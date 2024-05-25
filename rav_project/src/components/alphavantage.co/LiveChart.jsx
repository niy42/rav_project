import React, { useState, useEffect, useMemo } from 'react';
import { getStockData } from './services';
import { formatStockData } from './utils';
import ReactApexChart from 'react-apexcharts';
import { candleStickOptions } from './constants';

const LiveChart = ({ symbol }) => {
    const [stockData, setStockData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // Track if the component is still mounted

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getStockData(symbol);
                if (isMounted) {
                    setStockData(data);
                }
            } catch (error) {
                console.error('Error fetching stock data:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup function to prevent state updates on unmounted component
        };
    }, [symbol]); // Add `symbol` as a dependency to refetch when it changes

    const seriesData = useMemo(() => formatStockData(stockData), [stockData]);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ReactApexChart
                    series={[
                        {
                            data: seriesData
                        }
                    ]}
                    options={candleStickOptions}
                    type='candlestick'
                    height={400}
                    width={600}
                />
            )}
        </>
    );
};

export default LiveChart;

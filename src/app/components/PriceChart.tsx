'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchKlineData } from "../lib/api";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { format } from "date-fns";

interface PriceChartProps {
    symbol: string;
}

const PriceChart = ({ symbol }: PriceChartProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['klineData', symbol],
        queryFn: () => fetchKlineData(symbol, '1d', 90),
        refetchInterval: 60000, // Refetch every minute
    });

    if(isLoading) return <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"/>

    if(error || !data) return <div className="h-96 flex items-center justify-center text-red-500">Error loading chart data</div>

    const chartData = data.map((d) => ({
        price: Number(d.close),
        date: format(new Date(d.openTime), 'MMM d'),
    }));

    return (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text font-semibold mb-4 text-gray-900 dark:text-white">
                Price History (Last 90 Days)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray='3 3' stroke="#374151" />
                        <XAxis dataKey="date" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none' }} labelStyle={{ color: '#fff' }} />
                        <Area 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#3b82f6" 
                            fillOpacity={1} 
                            fill="url(#colorPrice)" 
                        />
                </AreaChart>
            </ResponsiveContainer>
        </section>
    )
}

export default PriceChart;
'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchTicker24h, fetchAllPrices } from "../lib/api";
import PriceChart from "./PriceChart";
import TradeSimulator from "./TradeSimulator";

interface CryptoDetailsProps {
    symbol: string;
}

const CryptoDetails = ({ symbol }: CryptoDetailsProps) => {
    const {data: prices} = useQuery({
        queryKey: ['prices'],
        queryFn: fetchAllPrices,
        refetchInterval: 30000, // Refetch every 30 seconds
    })

    const { data: ticker } = useQuery({
        queryKey: ['ticker24h', symbol],
        queryFn: () => fetchTicker24h(symbol),
        refetchInterval: 30000,
    });

    const currentPrice = prices?.find(p => p.symbol === symbol)?.price || '0';
    const priceNum = parseFloat(currentPrice);
    const change24h = ticker ? parseFloat(ticker.priceChangePercent) : 0;

    return(
        <section className="space-y-10">
            <div className="rounded-xl p-6 bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700/60 shadow-sm dark:shadow-[0_8px_30px_rgaba(0, 0, 0, 0.45)]">
                <h2 className="text-2xl font-bold md:text-3xl text-gray-900 dark:text-white mb-2">
                    {symbol.replace('USDT', '')}/USDT
                </h2>
                <div className="flex flex-wrap items-end gap-4 mt-4">
                    <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">${priceNum.toFixed(6)}</p>
                    <p className={`text-lg md:text-2xl font-semibold ${change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}% 
                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400"> (24h)</span>
                    </p>
                </div>
            </div>

            <PriceChart symbol={symbol} />

            <TradeSimulator symbol={symbol} currentPrice={priceNum}/>
        </section>
    )
}

export default CryptoDetails;
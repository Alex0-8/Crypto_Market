'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Transaction {
    type: 'buy' | 'sell';
    amount: number;
    price: number;
    total: number;
    timestamp: number;
}

interface TradeSimulator {
    symbol: string;
    currentPrice: number;
}

const TradeSimulator = ({ symbol, currentPrice }: TradeSimulator) => {
    const cleanSymbol = symbol.replace(/USDT$/, '');

    const [wallet, setWallet] = useState({ usdt: 1000, crypto: 0 }); // Start with $1000
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Load wallet and transactions from localStorage
    useEffect(() => {
        const savedWallet = localStorage.getItem(`wallet_${symbol}`);
        const savedTxs = localStorage.getItem(`transactions_${symbol}`);
        if(savedWallet) setWallet(JSON.parse(savedWallet));
        if(savedTxs) setTransactions(JSON.parse(savedTxs));
    }, [symbol]);

    // Save wallet and transactions to localStorage
    useEffect(() => {
        localStorage.setItem(`wallet_${symbol}`, JSON.stringify(wallet));
        localStorage.setItem(`transactions_${symbol}`, JSON.stringify(transactions));
    }, [wallet, transactions, symbol]);

    const handleTrade = (type: 'buy' | 'sell') => {
        const qnty = parseFloat(amount);
        if(isNaN(qnty) || qnty <= 0) return;

        const total = qnty * currentPrice;

        if (type === 'buy' && wallet.usdt < total) {
            alert('not enough usdt');
            return;
        }
        if (type === 'sell' && qnty > wallet.crypto) {
            alert('not enough crypto');
            return;
        }

        setWallet({
            usdt: type === 'buy' ? wallet.usdt - total : wallet.usdt + total,
            crypto: type === 'buy' ? wallet.crypto + qnty : wallet.crypto - qnty,
        });

        setTransactions([
            {
                type,
                amount: qnty,
                price: currentPrice,
                total,
                timestamp: Date.now(),
            },
            ...transactions
        ])

        setAmount('');
    }

    return (
        <section className="grid md:grid-cols-2 gap-8 mt-8">
            {/*Wallet*/}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 ring-1 ring-gray-200 dark:ring-gray-700/60 shadow-sm dark:shadow-[0_8px_30px_rgaba(0, 0, 0, 0.45)]"
            >
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Your Wallet</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">USDT Balance:</span>
                        <span className="font-bold text-3xl text-gray-900 dark:text-white">${wallet.usdt.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">{cleanSymbol} Balance:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{wallet.crypto.toFixed(4)}</span>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Aprox value: <span className="font-medium text-gray-900 dark:text-white"> ${(wallet.crypto * currentPrice).toFixed(2)} </span></p>
                    </div>
                </div>
            </motion.div>

            {/* Trade panel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl ring-1 ring-gray-200 dark:ring-gray-700/60 shadow-sm dark:shadow-[0_8px_30px_rgaba(0, 0, 0, 0.45)] p-6"
            >
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Trade Simulator</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Amount of {cleanSymbol}</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg px-4 py-2 w-full bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Current Price: <span className="font-medium text-gray-900 dark:text-white">${currentPrice.toFixed(6)}</span> ≈ Total: <span className="font-medium text-gray-900 dark:text-white">${(parseFloat(amount || '0') * currentPrice).toFixed(2)}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <button
                            onClick={() => handleTrade('buy')}
                            className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
                        >
                            <TrendingUp className="h-5 w-5"/>
                            Buy
                        </button>
                        <button
                            onClick={() => handleTrade('sell')}
                            className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
                        >
                            <TrendingDown className="h-5 w-5"/>
                            Sell
                        </button>
                    </div>
                </div>

                {/*brief history */}
                {transactions.length > 0 && (
                    <div className="mt-6 max-h-48 border-t border-gray-200 dark:border-gray-700 max-h48 overflow-y-auto">
                        <h4 className="font-medium mb-2 text-sm text-gray-700 dark:text-gray-300">Last Transactions</h4>
                        
                        <ul className="space-y-2">
                            {transactions.map((tx, index) => (
                                <li key={index} className="text-sm">
                                    {tx.type === 'buy' ? (
                                        <span className="text-green-600 dark:text-green-400">Bought {tx.amount} {cleanSymbol}</span>
                                    ) : (
                                        <span className="text-red-600 dark:text-red-400">Sold {tx.amount} {cleanSymbol}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>
        </section>
    )
}

export default TradeSimulator;
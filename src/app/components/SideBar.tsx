'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchAllPrices } from "../lib/api";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";


interface SideBarProps {
    selectedCrypto: string | null;
    setSelectedCrypto: (symbol: string) => void;
    searchQuery: string;
    isOpen: boolean;
    onClose: () => void;
}

const SideBar = ({ selectedCrypto, setSelectedCrypto, searchQuery, isOpen, onClose }: SideBarProps) => {
    const [favorites, setFavorites] = useState<string[]>([]);

    const { data: prices, isLoading } = useQuery({
        queryKey: ['prices'],
        queryFn: fetchAllPrices,
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    //load favorites from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('cryptoFavorites');
        if(saved) setFavorites(JSON.parse(saved));
    }, []);

    //save favorites to localStorage
    const toggleFavorite = (symbol: string) => {
        const newFavorites = favorites.includes(symbol)
            ? favorites.filter(f => f !== symbol)
            : [...favorites, symbol];
        setFavorites(newFavorites);
        localStorage.setItem('cryptoFavorites', JSON.stringify(newFavorites));
    }

    //filter data
    const filteredPrices = prices?.filter(crypto => 
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    //separate favorites
    const favoritedPrices = filteredPrices.filter(c => favorites.includes(c.symbol));
    const nonFavoritedPrices = filteredPrices.filter(c => !favorites.includes(c.symbol));

    const renderCryptoItem = (crypto: { symbol: string; price: string }) => (
        <motion.div
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            key={crypto.symbol}
            onClick={() => {
                setSelectedCrypto(crypto.symbol);
                // Close sidebar only on mobile viewport widths (Tailwind md ~= 768px)
                if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    onClose();
                }
            }}
            className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
                selectedCrypto === crypto.symbol
                ? 'bg-blue-100 dark:bg-blue-900/30'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
        >
            <div>
                <p className="font-semibold text-gray-900 dark:text-gray-400">
                    {crypto.symbol.replace('USDT', '')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    ${parseFloat(crypto.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 6})}
                </p>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(crypto.symbol)
                }}
                className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
                <Star 
                    className={`h-4 w-4 ${favorites.includes(crypto.symbol) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                />
            </button>
        </motion.div>
    );

    return(
        <>
            {/* Overlay for mobile when sidebar is open */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

                {/* Sidebar content */}
            <motion.aside
                initial={false}
                animate={{ x: isOpen ? 0 : -320 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`fixed left-0 top-16 bottom-0 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-800 z-50 overflow-y-auto md:relative md:translate-x-0 md:top-0`}
            >
                <div className="p-4">
                    {/* Close button for mobile */}
                    <div className="flex justify-end mb-4 md:hidden">
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Favorites Section */}
                    {favorites.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                Favorites
                            </h2>
                            <div className="space-y-2">
                                {favoritedPrices.map(renderCryptoItem)}
                            </div>
                        </div>                    
                    )}

                    {/* full list */}
                    <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        All Cryptocurrencies
                    </h2>
                    
                    {isLoading ? (
                        <div className="space-y-3">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"/>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {nonFavoritedPrices.slice(0, 50).map(renderCryptoItem)}
                        </div>
                    )}
                </div>
            </motion.aside>
        </>
    )
}

export default SideBar;
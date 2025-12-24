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
    const [isDesktop, setIsDesktop] = useState(false);

    const { data: prices, isLoading, error } = useQuery({
        queryKey: ['prices'],
        queryFn: fetchAllPrices,
        refetchInterval: 30000, // Refetch every 30 seconds
    });

    //load favorites from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('cryptoFavorites');
        if(saved) setFavorites(JSON.parse(saved));
    }, []);

    // track viewport size so sidebar auto-opens on desktop and closes on mobile
    useEffect(() => {
        const update = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 768);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
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
            className={`
                group relative
                flex items-center justify-between
                rounded-lg px-3 py-2.5
                cursor-pointer
                transition-all duration-150
                ring-1 ring-transparent
                ${
                    selectedCrypto === crypto.symbol
                    ? `
                        bg-blue-100/80 dark:bg-blue-900/30
                        ring-blue-300 dark:ring-blue-700/60
                    `
                    : `
                        hover:bg-gray-100/80 dark:hover:bg-gray-800/70
                        hover:ring-gray-200 dark:hover:ring-gray-700/60
                    `
                }
            `}
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

    const visible = isDesktop || isOpen;

    return(
        <>
            {/* Overlay for mobile when sidebar is open */}
            <AnimatePresence>
                {!isDesktop && isOpen && (
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
                animate={{ x: visible ? 0 : -320 }}
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

                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-4"/>
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
                    ) : error ? (
                        <p className="text-center text-red-600">
                            Error loading data.
                        </p>
                    ) : filteredPrices.length === 0  && !isLoading ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            No cryptocurrencies found.
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {nonFavoritedPrices.slice(0, 50).map(renderCryptoItem)}
                        </div>
                    )}
                </div>
            </motion.aside>
        </>
    )
};

export default SideBar;
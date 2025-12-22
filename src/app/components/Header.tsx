'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";


interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onMenuToggle: () => void;
}

const Header = ({ searchQuery, setSearchQuery, onMenuToggle }: HeaderProps) => {
    const { theme, setTheme } = useTheme();
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    return(
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1}}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/*right side: logo */}
                    <div className="flex items-center">
                        <button
                            onClick={onMenuToggle}
                            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <Menu  className="h-6 w-6"/>
                        </button>

                        <h1 className="ml-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            Crypto Analyzer
                        </h1>
                    </div>

                    {/*center setc*/}
                    <div className="flex-1 max-w-lg mx-4 sm:mx-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input 
                                type="text"
                                placeholder="Search Crypto (ej: BTC, Ethereum...)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/*right side: darkmode toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Change theme"
                    >
                        {!mounted ? (
                            <div className="h-5 w-5" />
                        ) : theme === 'dark' ? (
                            <Sun className="h-5 w-5 text-yellow-400" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-600"/>
                        )}
                    </button>
                </div>

            </div>
        </motion.header>
    )
}

export default Header;
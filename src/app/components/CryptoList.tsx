'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchAllPrices } from "../lib/api";

interface CryptoListProps {
    searchQuery?: string;
}

const CryptoList = ({ searchQuery = '' }: CryptoListProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['prices'],
        queryFn: fetchAllPrices,
        refetchInterval: 30000, //refetch every 30sec
    });

    if(isLoading) return <p className="text-center py-20 text-gray-600 dark:text-gray-400">Loading prices...</p>
    if(error) return <p className="text-center py-20 text-red-600">Error loading data</p>

    const filteredData = data?.filter((crypto) => 
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if(filteredData?.length === 0) return <p className="text-center py-20 text-gray-500">No results found for {searchQuery}</p>

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {filteredData?.slice(0, 50).map((crypto) => (
                <div 
                    key={crypto.symbol}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer"
                >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {crypto.symbol.replace('USDT', '')}/USDT
                    </h3>
                    <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                        ${parseFloat(crypto.price).toFixed(2)}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default CryptoList;
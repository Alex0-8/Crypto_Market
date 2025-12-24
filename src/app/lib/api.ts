import axios from 'axios'
import { CryptoPrice, KlineData } from './types'

const BINANCE_API = 'https://api.binance.com/api/v3'

export const fetchAllPrices = async (): Promise<CryptoPrice[]> => {
    const response = await axios.get(`${BINANCE_API}/ticker/price`);
    return response.data;
};

export const fetchTicker24h = async (symbol: string): Promise<any> => {
    const response = await axios.get(`${BINANCE_API}/ticker/24hr`, {
        params: { symbol },
    });
    return response.data;
}

//for the history of a crypto
export const fetchKlineData = async ( 
    symbol: string,
    interval: string = '1d',
    limit: number = 90,
): Promise<any[]> => {
    const response = await axios.get(`${BINANCE_API}/klines`, {
        params: {symbol, interval, limit},
    });
    return response.data.map((item: any) => ({
        openTime: item[0],
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
        closeTime: item[6],
    }))
}
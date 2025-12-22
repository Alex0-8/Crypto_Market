export interface CryptoPrice {
    symbol: string;
    price: string;
    priceChangePercent?: string;
}

export interface KlineData {
    openTime: number;
    open: string;
    high: string;
    low: string;
    close: string;
    closeTime: number;
}
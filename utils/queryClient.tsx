'use client';

import { QueryClient } from "@tanstack/react-query";

export const QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1min of cache
            retry: 2, //retry if fails 2 times
        }
    }
})
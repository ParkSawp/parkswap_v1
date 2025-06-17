import { useState, useCallback } from 'react';

export default function useGetTransactions() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cursor, setCursor] = useState('');

    const fetchTransactions = useCallback(async (address, currentData = [], currentCursor: string) => {
        try {
            setLoading(true);
            const params = new URLSearchParams({ address, cursor: currentCursor || '' });
            const response = await fetch('/api/portfolio/transactions?'+params.toString());
            const responseData = await response.json();
            if(currentCursor) {
                const mergedData = [...currentData];
                const transactions = responseData.transactions ?? [];
                for(const transactionBlock of transactions) {
                    const dayItem = mergedData.find(item => item.date === transactionBlock.date);
                    if(dayItem) {
                        dayItem.transactions.push(...transactionBlock.transactions);
                        continue;
                    }
                    mergedData.push(transactionBlock);
                }
                setData(mergedData);
            }
            else {
                setData(responseData.transactions ?? []);
            }
            setCursor(responseData.after ?? '');
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    }, [])

    return {
        data,
        loading,
        error,
        cursor,
        fetchTransactions,
        setTransactions: setData
    }
}
import { useState, useCallback } from 'react';

export default function useGetTransactions() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTransactions = useCallback(async (address) => {
        try {
            setLoading(true);
            const params = new URLSearchParams({ address });
            const response = await fetch('/api/portfolio/transactions?'+params.toString());
            const data = await response.json();
            setData(data.transactions ?? []);
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    }, [])

    return {
        data,
        loading,
        error,
        fetchTransactions
    }
}
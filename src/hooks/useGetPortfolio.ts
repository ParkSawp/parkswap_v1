import {useCallback, useState} from 'react';

export default function useGetPortfolio() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    const fetchPortfolio = useCallback(async (params: {address: string}): Promise<void> => {
        setLoading(true)
        const priceParams = new URLSearchParams(params);
        try {
            const response = await fetch('/api/portfolio?'+ priceParams.toString());
            const data = await response.json();
            setData(data?.data ?? null);
        } catch (e) {
            console.log({ error: e })
            setError(e.message);
        }
        setLastUpdate(new Date());
        setLoading(false);
    }, []);

    return {
        data,
        error,
        loading,
        lastUpdate,
        fetchPortfolio
    }
}
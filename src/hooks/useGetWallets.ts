import { useState, useCallback } from 'react';

export function useGetWallets() {

    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchWallets = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/wallets');
            const data = await response.json();
            setWallets(data ?? []);
        } catch (error) {}

        setLoading(false);

    }, [setWallets]);

    return {
        wallets,
        loading,
        fetchWallets,
    };
}
import { useState } from "react";

export default function useUpdateTransaction() {

    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    const updateTransaction = async ({ transactionId, hash }) => {
        setLoading(true);
        const params = new URLSearchParams({ transactionId, hash });
        try {
            const response = await fetch('/api/swap/transaction?'+ params.toString());
            const data = await response.json();
            setData(data);
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    }

    return {
        updateTransaction,
        error: error,
        data,
        loading
    }

}
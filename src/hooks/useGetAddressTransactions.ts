import {useCallback, useState} from 'react';

export default function useGetAddressTransactions() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetch = useCallback(function() {

    }, []);


    return {
        data,
        error,
        loading,
        fetch
    }
}
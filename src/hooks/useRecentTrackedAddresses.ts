import { useState, useCallback, useEffect } from "react";

type Addresses = {
    [key: string]: object
}

const RECENT_ADDRESSES = "RECENT_ADDRESSES";

const getStoredAddresses = () => {
    try {
        const storedTokens = localStorage.getItem(RECENT_ADDRESSES);
        if (storedTokens) {
            return JSON.parse(storedTokens);
        }
    } catch (e) {}
    return { portfolio: {}, transactions: {}};
}

const saveAddress = function(data: Addresses) {
    localStorage.setItem(RECENT_ADDRESSES, JSON.stringify(data));
};

export default function useRecentTrackedAddresses() {
    const [data, setData] = useState({portfolio: {}, transactions: {}});

    const addRecent = (address: string, portfolio: null|object, transactions: null|object) => {
        if(portfolio !== null) {
            data.portfolio[address] = { ...portfolio, address };
        }
        if(transactions !== null) {
            data.transactions[address] = transactions;
        }
        saveAddress(data);
        setData({ ...data });
    };

    useEffect(() => {
        setData(getStoredAddresses())
    }, [])

    return {
        data,
        addRecent
    };
}
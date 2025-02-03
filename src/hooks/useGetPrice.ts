import {useState} from "react";

export type TokenRequest = {
    sellAddress: string;
    buyAddress: string;
    amount: string;
    taker: string
};

export default function useGetPrice() {
    const [price, setPrice] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getPrice = async (params: TokenRequest) => {
        setLoading(true);
        const priceParams = new URLSearchParams(params);
        let price = null;
        try {
            const response = await fetch('/api/swap/price?'+ priceParams.toString());
            price = await response.json();
            setPrice(price);
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
        return price;
    };

    const resetPrice = () => {
        setPrice(null);
    }

    return {
        error,
        price,
        loading,
        getPrice,
        resetPrice
    };
}
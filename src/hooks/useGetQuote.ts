import {useState} from "react";

export type TokenRequest = {
    sellAddress: string;
    buyAddress: string;
    amount: string;
    taker: string
};

export default function useGetQuote() {
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getQuote = async (params: TokenRequest) => {
        setLoading(true);
        const priceParams = new URLSearchParams(params);
        let quote = null;
        try {
            const response = await fetch('/api/swap/quote?'+ priceParams.toString());
            quote = await response.json();
            setQuote(quote);
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
        return quote;
    };

    return {
        error,
        quote,
        loading,
        getQuote
    };
}
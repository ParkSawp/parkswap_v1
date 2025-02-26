import {useCallback, useState} from "react";


export default function useGetUsdPrice() {

    const [amount, setAmount] = useState(0);

    const updateAmount = useCallback(async (token: {name: string, symbol: string}, quantity: number) => {
        if(!token || !quantity) {
            setAmount(0);
            return;
        }
        try {
            const params = new URLSearchParams({
                name: token.name.toLowerCase(),
                symbol: token.symbol.toLowerCase()
            })
            const url = `/api/tokens/usd?`+ params.toString();
            const response = await fetch(url);
            const data = await response.json();

            setAmount((data.amount ?? 0) * quantity);
        } catch (error) {
            setAmount(0);
        }
    }, [setAmount]);

    return {
        updateAmount,
        amount
    };
}
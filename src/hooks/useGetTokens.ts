import useAppSettings from "@/src/hooks/useAppSettings";
import {useState, useCallback} from "react";


export default function useGetTokens() {

    const settings = useAppSettings();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTokens = useCallback(async (searchs) => {
        setIsLoading(true);
        const params = {
            chainId: settings.selectedChainId
        };
        if(searchs.key) {
            params['search'] = searchs.key;
        }
        if(searchs.wallet) {
            params['walletAddress'] = searchs.wallet
        }
        try {
            const queryParams = new URLSearchParams(params);
            const response = await fetch('/api/tokens?'+ queryParams.toString());
            const data = await response.json();
            setData(data);
        }  catch (error) {
            setError(error);
        }
        setIsLoading(false);
    }, [setData, setError, setIsLoading])

    return {
        tokens: data,
        isLoading: isLoading,
        error: error,
        fetchTokens
    }
}
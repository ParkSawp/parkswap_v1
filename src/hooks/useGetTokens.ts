import useFetch from "@/src/hooks/useFetch";
import useAppSettings from "@/src/hooks/useAppSettings";


export default function useGetTokens(address, searchKey) {

    const settings = useAppSettings();
    const params = {
        chainId: settings.selectedChainId
    };
    if(searchKey) {
        params['search'] = searchKey;
    }
    if(address) {
        params['walletAddress'] = address;
    }
    const queryParams = new URLSearchParams(params);
    const { data, error, isLoading } = useFetch('/api/tokens?'+ queryParams.toString());

    return {
        tokens: data,
        isLoading: isLoading,
        error: error
    }
}
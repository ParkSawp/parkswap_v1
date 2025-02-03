import useFetch from "@/src/hooks/useFetch";
import useAppSettings from "@/src/hooks/useAppSettings";


export default function useGetTokens(searchKey) {

    const settings = useAppSettings();
    const params = {
        chainId: settings.selectedChainId
    };
    if(searchKey) {
        params['search'] = searchKey;
    }
    const queryParams = new URLSearchParams(params);
    const { data, error, isLoading } = useFetch('/api/tokens?'+ queryParams.toString());

    return {
        tokens: data,
        isLoading: isLoading,
        error: error
    }
}
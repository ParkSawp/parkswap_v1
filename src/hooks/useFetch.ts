import useSWR, { SWRResponse } from "swr";
import useSWRMutation, {  SWRMutationResponse } from 'swr/mutation'


const fetcher = (...args: any): Promise<any> => {
    // @ts-ignore
    return fetch(...args).then(res => res.json());
};

export default function useFetch<T>(url: string): SWRResponse  {
    return useSWR(url, fetcher);
}

export function useMutationFetch<T>(url: string): SWRMutationResponse  {
    return useSWRMutation(url, fetcher);
}
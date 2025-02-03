import {getBalance} from "@wagmi/core";
import {useCallback, useEffect, useState} from "react";
import {useAccount, useConfig} from "wagmi";


export default function useGetWalletTokens(tokens) {

    const [userTokens, setUserTokens] = useState([]);
    const [userTokensAddress, setUserTokensAddress] = useState([]);
    const { address } = useAccount();
    const config = useConfig();

    const getTokenBalance = async (token) => {
        try {
            const balance = !token.address ? await getBalance(config, { address }) : await getBalance(config, {
                address,
                token: token.address,
            });
            return (balance.value > 0) ? token.address : false;
        } catch (e) {
            return false;
        }
    };

     const loadToken = useCallback(async() => {
         const allTokenRequestPromises = [];
         tokens?.forEach((token) => {
             allTokenRequestPromises.push(getTokenBalance(token));
         });
         const balances = (await Promise.all(allTokenRequestPromises)).filter((value) => value !== false);
         const userTokens = tokens?.filter((token) => balances.includes(token.address));
         setUserTokens(userTokens ?? []);
         setUserTokensAddress(balances ?? []);
    }, [tokens, setUserTokens, setUserTokensAddress]);

    useEffect(() => {
        loadToken()
    }, [loadToken]);

    return {
        userTokens,
        userTokensAddress
    }
}
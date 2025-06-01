
import TokenRepository, { type Token } from '@/src/core/Models/TokenRepository';
import { base, polygon, avalanche, bsc, mainnet }  from "@wagmi/core/chains"
import {formatUnits, Typed as token} from "ethers";
import CoinGeckoProvider from "@/src/core/ApiServices/TokensProvider/CoinGeckoProvider";
import * as fns from 'date-fns';
import TransactionFormatter from "@/src/core/Fotmatter/TransactionFormatter";

export default class AlchemyProvider {

    public static TokenCache = {};

    public static getChainFromEnum(alchemyChainId: string) {
        if(alchemyChainId === 'base-mainnet') {
            return base;
        }
        if(alchemyChainId === 'polygon-mainnet') {
            return polygon;
        }
        if(alchemyChainId === 'avax-mainnet') {
            return avalanche;
        }
        if(alchemyChainId === 'bnb-mainnet') {
            return bsc;
        }
        // arb-mainnet
        // Optimism
        // starknet-mainnet
        // solana-mainnet
        // bitcoin-mainnet
        return mainnet;
    }

    public static getChainEnum(chainId: number): string {
        if(chainId === base.id) {
            return 'base-mainnet';
        }
        if(chainId === polygon.id) {
            return 'polygon-mainnet';
        }
        if(chainId === avalanche.id) {
            return 'avax-mainnet';
        }
        if(chainId === bsc.id) {
            return 'bnb-mainnet';
        }
        return 'eth-mainnet';
    }


    public static async loadTokenIcon(token, chainId): Promise<void> {
        const storedToken = await TokenRepository.getTokenByAddress(token.address, chainId);
        if(storedToken) {
            token.logo_uri = storedToken.logo_uri;
            return;
        }
        token.logo_uri = await CoinGeckoProvider.shared.getTokenIcon(token);
    }

    protected static async loadTokenDetails(token) {
        token.is = { native: token.address === 'null' };
        const gekoCoin = CoinGeckoProvider.allGekoTokensBySymbol[token.symbol.toLowerCase()];
        if(!gekoCoin) {
            return;
        }

        const gekoCoinDetails = await CoinGeckoProvider.shared.getTokenDetails(gekoCoin.id);
        token.geko = gekoCoinDetails;
        if(!gekoCoinDetails?.categories) {
            return;
        }

        token.categories = gekoCoinDetails.categories;
        token.is.stablecoin = gekoCoinDetails.categories.find(item => item.toLowerCase().includes('stablecoin'));
    }

    protected static getNetworkApiUrl(chainId: number): string {
        const alchemyNetworkId = AlchemyProvider.getChainEnum(chainId);
        return 'https://'+ alchemyNetworkId +'.g.alchemy.com/v2/'+process.env.ALCHEMY_API_KEY;
    }

    protected static getAlchemyUrl(path: string, type: string, version: string = 'v1'): string {
        return `https://api.g.alchemy.com/${type}/${version}/${process.env.ALCHEMY_API_KEY}/${path}`;
    }
    protected static getTransactionByAddressUrl(): string {
        return AlchemyProvider.getAlchemyUrl('transactions/history/by-address', 'data');
    }
    protected static getPriceApiUrl(path: string = ''): string {
        return AlchemyProvider.getAlchemyUrl(path, 'prices');
    }


    protected static async request(url: string, params: object, rootProperty: string = null): Promise<any> {
        const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};

        params['jsonrpc'] = "2.0";
        const body = JSON.stringify(params);

        try {
            const response = await fetch(url, { method: 'POST', headers: headers, body: body });
            try {
                const jsonData = await response.json();
                if(rootProperty) {
                    return jsonData[rootProperty] ?? null;
                }
                return jsonData ?? null;
            } catch (e) {
                console.log({ error: e.message, method: 'AlchemyProvider.request->response.json', url, params, body})
                return null;
            }
        } catch (e) {
            console.log({ error: e.message, method: 'AlchemyProvider.request', url, params, body})
            return null;
        }
    }

    public static async usdByAddresses(addresses: string[], chainId): Promise<any> {
        const chain = AlchemyProvider.getChainEnum(chainId);
        const addressesParams = addresses.map((address) => {
            return {
                network: chain,
                address,
            }
        });
        const data = await AlchemyProvider.request(AlchemyProvider.getPriceApiUrl('tokens/by-address'), { addresses: addressesParams }, 'data');
        return data ?? [];
    }
    public static async usd(symbol: string): Promise<any> {
        const url = AlchemyProvider.getPriceApiUrl('tokens/by-symbol?symbols='+symbol);

        try {
            const response = await fetch(url);
            const data = await response.json();

            if(!data?.data) {
                return {};
            }
            let value = 0;
            data.data.forEach(item => {
                if(item.symbol === symbol) {
                    value = parseFloat(item.prices[0].value);
                }
            });
            return { symbol, value };
        } catch (e) {}

        return { symbol, value: 0 };
    }
    public static async walletTokens(address: string): Promise<any> {
        const chains = [ base, bsc, polygon, avalanche, mainnet ];
        const wallets = {
            chains: [],
            tokens: [],
            amount: { total: 0 }
        };

        for await (const chain of chains) {
            const result = await AlchemyProvider.walletTokensByChain(address, chain);
            if(result.totalAmount === 0) continue;
            wallets.chains.push(chain);
            wallets.tokens.push(...result.tokens);
            wallets.amount[chain.id] = result.totalAmount;
            wallets.amount.total += result.totalAmount;
            // console.log({ symbol: chain.name, amount: result.totalAmount, tokens: result.tokens.length })
        }

        wallets.tokens.sort((a, b) => b?.price.total - a?.price.total);

        return wallets;
    }
    public static async walletTokensByChain(address: string, chain): Promise<any> {
        await CoinGeckoProvider.shared.getAll();

        const chainId = chain.id;
        const nativeTokenSymbol = chain.nativeCurrency.symbol;

        const balances = await AlchemyProvider.balances(address, chainId);
        const tokenAddresses = Object.keys(balances);

        const requestTokenAddresses = [...tokenAddresses], allTokens = [];
        do {
            const addresses = requestTokenAddresses.splice(0, 24);
            const usdValues = await AlchemyProvider.usdByAddresses(addresses, chainId);
            allTokens.push(...usdValues);
        } while(requestTokenAddresses.length > 0);

        const price = await AlchemyProvider.usd(nativeTokenSymbol);
        allTokens.push({
            address: 'null',
            decimals: chain.nativeCurrency.decimals,
            prices: [{...price, currency: 'usd'}],
        });
        balances['null'] = { ...balances['null'], symbol: nativeTokenSymbol, decimals: chain.nativeCurrency.decimals };

        const formattedTokens = allTokens.map(token => {
            const tokenFromAddress = balances[token.address];
            let selectedPrice = null;
            token.prices.forEach(price => {
                if(!tokenFromAddress) return;

                const tokenBalance = tokenFromAddress['balance'];
                const isNull = tokenBalance === null || tokenBalance === undefined || tokenBalance === 'null'
                const balance = isNull ? 0 : parseFloat(formatUnits(tokenBalance, tokenFromAddress.decimals));
                price.balance = balance.toFixed(5);
                price.total = price.value * balance;
                if(price.currency === 'usd') {
                    selectedPrice = price;
                }
            })

            const isNative = token.address === 'null';
            return {
                chainId,
                address: token.address ?? null,
                symbol: tokenFromAddress.symbol,
                price: selectedPrice || { value: 0, currency: 'usd', total: 0, balance: 0},
                shortAddress: isNative ? chain.name : token.address.slice(0, 6)+'...'+token.address.slice(-4),
                isNative,
            }
        }).filter(token => token.price && token.price.total > 0.001);
        const totalAmount = formattedTokens.reduce((total, item) => total + (item.price?.total || 0), 0);
        formattedTokens.sort((a, b) => b.price?.total - a.price?.total);

        const promises = [];

        formattedTokens.forEach((token) => {
            const loadMoreDetails = async () => {
                await AlchemyProvider.loadTokenIcon(token, chainId);
                await AlchemyProvider.loadTokenDetails(token);
            };
            promises.push(loadMoreDetails());
        });

        await Promise.all(promises);
        return {
            tokens: formattedTokens,
            totalAmount,
        }
    }
    public static async transactions(address: string, after: string = ''): Promise<any> {
        const result = await AlchemyProvider.request(
            AlchemyProvider.getTransactionByAddressUrl(),
            {
                "limit": 25,
                'after': after,
                "addresses": [
                    {
                        "address": address,
                        "networks": [
                            AlchemyProvider.getChainEnum(base.id),
                            AlchemyProvider.getChainEnum(mainnet.id),
                            // AlchemyProvider.getChainEnum(avalanche.id),
                            // AlchemyProvider.getChainEnum(polygon.id),
                            // AlchemyProvider.getChainEnum(bsc.id),
                        ]
                    }
                ]
            },
            null
        );

        if(!result?.transactions) {
            return { after: '', transactions: []};
        }

        return {
            after: result.after,
            transactions: await TransactionFormatter.formatByDate(result.transactions, address)
        };
    }

    public static async tokenMetaData(tokenAddress: string, chainId: number): Promise<any> {
        if(AlchemyProvider.TokenCache[chainId] && AlchemyProvider.TokenCache[chainId][tokenAddress]) {
            return AlchemyProvider.TokenCache[chainId][tokenAddress];
        }
        AlchemyProvider.TokenCache[chainId] = AlchemyProvider.TokenCache[chainId] || {};
        const data = await AlchemyProvider.request(AlchemyProvider.getNetworkApiUrl(chainId), {
            id: chainId,
            method: "alchemy_getTokenMetadata",
            params: [tokenAddress]
        }, 'result');

        const result = {address: tokenAddress, ...data};
        AlchemyProvider.TokenCache[chainId][tokenAddress] = result;
        return result;
    }
    public static async balances(walletAddress: string, chainId: number): Promise<{[key: string]: Token}> {
        if(!walletAddress) {
            return {};
        }
        const data = await AlchemyProvider.request(AlchemyProvider.getNetworkApiUrl(chainId), {
            id: chainId,
            method: "alchemy_getTokenBalances",
            params: [
                walletAddress
            ]
        }, 'result');

        if(!data?.tokenBalances) {
            return {};
        }

        const tokenList = data.tokenBalances.filter((token) => {
            return token.tokenBalance !== "0";
        });
        const tokenBalancePromises = [];
        const balances = {};
        const symbols = [];

        tokenList.forEach((token) => {
            tokenBalancePromises.push(AlchemyProvider.tokenMetaData(token.contractAddress, chainId));
            balances[token.contractAddress] = token.tokenBalance;
            symbols.push(token.symbol);
        });

        const tokensMetaMetaData = await Promise.all(tokenBalancePromises);
        const tokens = {};
        tokensMetaMetaData.forEach((tokenMetaData) => {
            tokens[tokenMetaData.address.toLowerCase()] = {
                address: tokenMetaData.address,
                name: tokenMetaData.name,
                symbol: tokenMetaData.symbol,
                logo_uri: tokenMetaData.logo,
                decimals: tokenMetaData.decimals,
                balance: balances[tokenMetaData.address],
            };
        });
        return tokens;
    }

}
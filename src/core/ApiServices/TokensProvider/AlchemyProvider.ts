
import TokenRepository, { type Token } from '@/src/core/Models/TokenRepository';
import {
    base, polygon, avalanche, bsc, mainnet, fantom, berachain, mantle,
    zksync, gnosis, arbitrum,arbitrumNova, polygonZkEvm, celo, scroll,
    sonic, blast, linea, astar, zora
}  from "@wagmi/core/chains"
import {ethers, formatUnits, Log, Typed as token} from "ethers";
import CoinGeckoProvider from "@/src/core/ApiServices/TokensProvider/CoinGeckoProvider";
import * as fns from 'date-fns';
import TransactionFormatter from "@/src/core/Fotmatter/TransactionFormatter";
import {Logs} from "@/src/config/Logs";
import {STABLE_COINS} from "@/src/config/constants";

export default class AlchemyProvider {

    public static CHAINS: {id: number, alchemyId: string, chain: any}[] = [
        {
            id: celo.id,
            alchemyId: 'celo-mainnet',
            chain: celo
        },
        {
            id: arbitrum.id,
            alchemyId: 'arb-mainnet',
            chain: arbitrum
        },
        {
            id: base.id,
            alchemyId: 'base-mainnet',
            chain: base
        },
        {
            id: polygon.id,
            alchemyId: 'polygon-mainnet',
            chain: polygon
        },
        {
            id: avalanche.id,
            alchemyId: 'avax-mainnet',
            chain: avalanche
        },
        {
            id: bsc.id,
            alchemyId: 'bnb-mainnet',
            chain: bsc
        },
        {
            id: fantom.id,
            alchemyId: 'fantom-mainnet',
            chain: fantom
        },
        {
            id: berachain.id,
            alchemyId: 'berachain-mainnet',
            chain: berachain
        },
        {
            id: mantle.id,
            alchemyId: 'mantle-mainnet',
            chain: mantle
        },
        {
            id: zksync.id,
            alchemyId: 'zksync-mainnet',
            chain: zksync
        },
        {
            id: gnosis.id,
            alchemyId: 'gnosis-mainnet',
            chain: gnosis
        },
        {
            id: arbitrumNova.id,
            alchemyId: 'arbnova-mainnet',
            chain: arbitrumNova
        },
        {
            id: polygonZkEvm.id,
            alchemyId: 'polygonzkevm-mainnet',
            chain: polygonZkEvm
        },
        {
            id: sonic.id,
            alchemyId: 'sonic-mainnet',
            chain: sonic
        },
        {
            id: scroll.id,
            alchemyId: 'scroll-mainnet',
            chain: scroll
        },
        {
            id: blast.id,
            alchemyId: 'blast-mainnet',
            chain: blast
        },
        {
            id: linea.id,
            alchemyId: 'linea-mainnet',
            chain: linea
        },
        {
            id: astar.id,
            alchemyId: 'astar-mainnet',
            chain: astar
        },
        {
            id: zora.id,
            alchemyId: 'zora-mainnet',
            chain: zora
        },
        {
            id: mainnet.id,
            alchemyId: 'eth-mainnet',
            chain: mainnet
        },
    ];

    public static SUPPORTED_CHAINS = [
        base,
        bsc,
        polygon,
        avalanche,
        mainnet,
        fantom,
        berachain,
        mantle,
        zksync,
        gnosis,
        arbitrum,
        arbitrumNova,
        polygonZkEvm,
        celo,
        scroll,
        sonic,
    ];

    public static TokenCache = {};

    public static getChainFromEnum(alchemyChainId: string): any {
        for(const chain of AlchemyProvider.CHAINS) {
            if(chain.alchemyId === alchemyChainId) {
                return chain.chain;
            }
        }
        return ;
    }

    public static getChain(chainId: number): any {
        for(const chain of AlchemyProvider.CHAINS) {
            if(chain.id === chainId) {
                return chain.chain;
            }
        }
        return mainnet;
    }
    public static getChainEnum(chainId: number): string {
        for(const chain of AlchemyProvider.CHAINS) {
            if(chain.id === chainId) {
                return chain.alchemyId;
            }
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
        token.categories = [];
        if(STABLE_COINS.includes(token.symbol?.toLowerCase())) {
            Logs.watch('Stable Coin '+token.symbol);
            token.categories.push('stablecoin');
        }

        const gekoCoin = CoinGeckoProvider.allGekoTokensBySymbol[token.symbol?.toLowerCase()];
        if(!gekoCoin) {
            return;
        }

        const gekoCoinDetails = await CoinGeckoProvider.shared.getTokenDetails(gekoCoin.id);
        token.geko = gekoCoinDetails;

        if(!gekoCoinDetails?.categories) {
            return;
        }

        token.categories = [...token.categories, ...gekoCoinDetails.categories];
        token.is.stablecoin = gekoCoinDetails.categories.find(item => item?.toLowerCase().includes('stablecoin'));
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
                Logs.log({ error: e.message, method: 'AlchemyProvider.request->response.json', url, params, body})
                return null;
            }
        } catch (e) {
            Logs.error({ error: e.message, method: 'AlchemyProvider.request', url, params, body})
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
                if(item && item.symbol === symbol) {
                    value = parseFloat(item.prices[0].value);
                }
            });
            return { symbol, value };
        } catch (e) {}

        return { symbol, value: 0 };
    }
    public static async walletTokens(address: string): Promise<any> {
        const chains = AlchemyProvider.SUPPORTED_CHAINS;
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
            // Logs.log({ symbol: chain.name, amount: result.totalAmount, tokens: result.tokens.length })
        }

        wallets.tokens.sort((a, b) => b?.price.total - a?.price.total)
            .sort((a, b) => a.isNative ? -1 : 1)

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
        if(balances['null']) {
            balances['null'] = { ...balances['null'], symbol: nativeTokenSymbol, decimals: chain.nativeCurrency.decimals };
        }

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
                symbol: tokenFromAddress?.symbol,
                price: selectedPrice || { value: 0, currency: 'usd', total: 0, balance: 0},
                shortAddress: isNative ? chain.name : token.address.slice(0, 6)+'...'+token.address.slice(-4),
                isNative,
            }
        }).filter(token => token.price && (token.price.total > 0.001 && token.price.total < 10_000_000));
        const totalAmount = formattedTokens.reduce((total, item) => total + (item.price?.total || 0), 0);
        formattedTokens
            .sort((a, b) => b.price?.total - a.price?.total);

        Logs.watch('Formatted Tokens '+formattedTokens.length);
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
                "limit": 15,
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
    public static async nativeTokenBalance(walletAddress: string, chainId: number): Promise<{balanceWei: string, balanceEther: number, balanceFormatted: string}> {
        try {
            const data = await AlchemyProvider.request(AlchemyProvider.getNetworkApiUrl(chainId), {
                id: chainId,
                method: "eth_getBalance",
                params: [
                    walletAddress
                ]
            });
            if(!data?.result) {
                return { balanceWei: '0', balanceEther: 0, balanceFormatted: '0.00'};
            }
            const balanceWei = BigInt(data.result);
            const balanceEther = Number(balanceWei) / Math.pow(10, 18);

            return {
                balanceWei: data.result,
                balanceEther: balanceEther,
                balanceFormatted: balanceEther.toFixed(6)
            };
        } catch(e) {
            Logs.watch({ error: e.message, method: 'AlchemyProvider.nativeTokenBalance', walletAddress, chainId })
        }
    }
    public static async balances(walletAddress: string, chainId: number): Promise<{[key: string]: Token}> {
        if(!walletAddress) {
            return {};
        }
        let pageKey = null, hasTokenBalances = true, deep = 0;
        const tokenBalances = [];

        do {
            const params = {maxCount: 100};
            if(pageKey) {
                params['pageKey'] = pageKey;
            }
            const data = await AlchemyProvider.request(AlchemyProvider.getNetworkApiUrl(chainId), {
                id: chainId,
                method: "alchemy_getTokenBalances",
                params: [
                    walletAddress,
                    "erc20",
                    params
                ]
            });
            deep++;
            if(!data?.result?.tokenBalances) {
                break;
            }
            tokenBalances.push(...data.result.tokenBalances);
            pageKey = data.result.pageKey;
            hasTokenBalances = data.result.tokenBalances.length > 0;
        } while(hasTokenBalances && deep < 20);

        const chain = AlchemyProvider.getChain(chainId);
        Logs.watch(' => '+chain.name+' '+tokenBalances.length)
        const tokenList = tokenBalances.filter((token) => {
            return token.tokenBalance !== "0";
        });
        const nativeToken = await AlchemyProvider.nativeTokenBalance(walletAddress, chainId);

        tokenList.push({
            contractAddress: 'null',
            address: 'Native',
            tokenBalance: nativeToken?.balanceWei || '0',
            symbol: chain.nativeCurrency.symbol,
            decimals: chain.nativeCurrency.decimals,
            name: chain.nativeCurrency.name,
        })
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
            tokens[tokenMetaData.address?.toLowerCase()] = {
                address: tokenMetaData.address,
                name: tokenMetaData.name,
                symbol: tokenMetaData.symbol,
                logo_uri: tokenMetaData.logo,
                decimals: tokenMetaData.decimals,
                balance: balances[tokenMetaData.address],
            };
        });
        Logs.watch(' => Post filter '+chain.name+' '+Object.keys(tokens).length)
        return tokens;
    }

}
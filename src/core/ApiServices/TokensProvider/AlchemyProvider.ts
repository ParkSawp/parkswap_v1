
import TokenRepository, { type Token } from '@/src/core/Models/TokenRepository';

export default class AlchemyProvider {

    public static getChainEnum(chainId: number): string {
        if(chainId === 8453) {
            return 'base-mainnet';
        }
        return 'eth-mainnet';
    }


    protected static async request(params: object): Promise<any> {
        const url = 'https://base-mainnet.g.alchemy.com/v2/'+process.env.ALCHEMY_API_KEY;
        const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};

        params['jsonrpc'] = "2.0";
        const body = JSON.stringify(params);

        const response = await fetch(url, { method: 'POST', headers: headers, body: body });
        return (await response.json())?.result ?? null;
    }

    public static async usd(symbol: string): Promise<any> {
        const url = 'https://api.g.alchemy.com/prices/v1/'+process.env.ALCHEMY_API_KEY+'/tokens/by-symbol?symbols='+symbol;

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

    public static async tokenMetaData(tokenAddress: string, chainId: number): Promise<any> {
        const data = await AlchemyProvider.request({
            id: chainId,
            method: "alchemy_getTokenMetadata",
            params: [tokenAddress]
        });

        return {address: tokenAddress, ...data};
    }
    public static async balances(walletAddress: string, chainId: number): Promise<{[key: string]: Token}> {
        if(!walletAddress) {
            return {};
        }
        const data = await AlchemyProvider.request({
            id: chainId,
            method: "alchemy_getTokenBalances",
            params: [
                walletAddress,[
                    "NATIVE_TOKEN",
                    "erc20"
                ]
            ]
        });

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
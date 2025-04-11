import CoinGeckoProvider from "@/src/core/ApiServices/TokensProvider/CoinGeckoProvider";
import ITokenProvider from "@/src/core/ApiServices/TokensProvider/ITokenProvider";
import TokenRepository, { type Token } from '@/src/core/Models/TokenRepository';

import {formatUnits, isAddress} from 'ethers';
import AlchemyProvider from "@/src/core/ApiServices/TokensProvider/AlchemyProvider";

export default class TokenProvider {

    private static lockTokenCreation = false;

    private static providers: ITokenProvider[] = [
        CoinGeckoProvider.shared
    ];

    public static async tokenFormProvider(address: string, chainId: string): Promise<Token|null> {
        let token = null;
        try {
            for await (const provider of this.providers) {
                token = await provider.getToken(address, chainId);
                if(token) {
                    await TokenRepository.create(token);
                }
            }
        } catch (e) {
            console.log('TOKEN CREATION ERROR : '+ e.message);
        }

        return token;
    }

    public static async tokens(chainId: string, walletAddress: string, search: string): Promise<Token[]> {
        const walletTokens = await AlchemyProvider.balances(walletAddress, Number(chainId));
        let tokens = await TokenRepository.getFromChainId(chainId);
        const tokensSymbols = new Set();
        Object.values(walletTokens).forEach((token) => tokensSymbols.add(token.symbol));

        const usdPricesPromises= [];
        const walletTokensBySymbol: {[key: string]: Token} = {};

        tokens = tokens.filter((token) => {
            if(walletTokens[token.address]) {
                const walletToken = walletTokens[token.address]
                const tokenDetailMerged = { ...walletToken, ...token };
                if(!token.logo_uri) {
                    tokenDetailMerged.logo_uri = walletToken.logo_uri;
                }
                usdPricesPromises.push(AlchemyProvider.usd(token.symbol))
                walletTokensBySymbol[token.symbol] = tokenDetailMerged;
                return false;
            }
            return true;
        });
        const usdPrices = await Promise.all(usdPricesPromises);

        usdPrices.forEach((item) => {
            if(item && walletTokensBySymbol[item.symbol]) {
                walletTokensBySymbol[item.symbol].usd = item.value;
                const balance = walletTokensBySymbol[item.symbol]['balance'];
                const decimals = walletTokensBySymbol[item.symbol]['decimals'];
                walletTokensBySymbol[item.symbol]['totalAmount'] = balance ? parseFloat(formatUnits(balance, decimals)) * item.value : 0;
            }
        });
        const walletTokenOrdered = Object.values(walletTokensBySymbol).sort((a, b) => a['totalAmount'] > b['totalAmount'] ? -1 : 1);

        tokens = [...walletTokenOrdered, ...tokens];

        tokens = tokens.filter((token) => token.name && token.symbol && token.decimals);

        if(search) {
            search = search.toLowerCase();
            tokens = tokens.filter((token) => {
                return token.address?.includes(search)
                    || token.name.toLowerCase().includes(search)
                    || token.symbol.toLowerCase().includes(search);
            });
            if(!tokens.length && isAddress(search)) {
                const token = await TokenProvider.tokenFormProvider(search, chainId);
                token && tokens.push(token);
            }
        }
        return tokens;
    }

}
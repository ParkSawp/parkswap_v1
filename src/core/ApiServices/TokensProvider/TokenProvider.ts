import CoinGeckoProvider from "@/src/core/ApiServices/TokensProvider/CoinGeckoProvider";
import ITokenProvider from "@/src/core/ApiServices/TokensProvider/ITokenProvider";
import TokenRepository, { type Token } from '@/src/core/Models/TokenRepository';

import { isAddress } from 'ethers';

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

    public static async tokens(chainId: string, search: string): Promise<Token[]> {
        let tokens = await TokenRepository.getFromChainId(chainId);

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
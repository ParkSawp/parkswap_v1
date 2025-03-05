import ITokenProvider from "@/src/core/ApiServices/TokensProvider/ITokenProvider";
import { type Token } from "@/src/core/Models/TokenRepository";
import {getToken} from "@wagmi/core";
import connectKitConfig from '../../../config/connectKitConfig.js';


type CoinGekoToken = {symbol: string, id: string, name: string};
type CoinGekoTokenDetail = {
    image: {
        small: string;
        thumb: string;
        large: string;
    }
}

export default class CoinGeckoProvider implements ITokenProvider {

    public static shared = new CoinGeckoProvider();
    public static IconNotFoundSrc = '/svg/tokens/icon.404.svg';

    public static async getTokensPrice(ids: string[]): Promise<{ amount: Number }> {
        ids = ids.map((id) => id.toLowerCase());
        const params = new URLSearchParams({
            ids: ids.join(','),
            vs_currencies: 'usd'
        });
        const response = await fetch(process.env['COIN_GECKO_URL'] +'/simple/price?'+ params.toString());
        return await response.json();
    }

    public async getTokenUsdPrice(id: string, symbol: string): Promise<{ amount: Number }> {
        id = id.toLowerCase();
        symbol = symbol.toLowerCase();
        const params = new URLSearchParams({
            ids: [id, symbol].join(','),
            vs_currencies: 'usd'
        });
        const response = await fetch(process.env['COIN_GECKO_URL'] +'/simple/price?'+ params.toString());
        const data = await response.json();

        return { amount: data[id]?.usd || data[symbol]?.usd || 0 };
    }
    public async getAll(): Promise<CoinGekoToken[]> {
        const tokenListResponse = await fetch(process.env['COIN_GECKO_TOKEN_URL']+'/list');
        const data = await tokenListResponse.json();
        if(Array.isArray(data)) {
            return data;
        }
        return [];
    }
    public async getTokenDetails(id: string): Promise<CoinGekoTokenDetail> {
        const tokenResponse = await fetch(process.env['COIN_GECKO_TOKEN_URL']+'/'+id);
        return await tokenResponse.json();
    }

    public async getTokenIcon(token): Promise<string> {
        const tokens = await this.getAll();
        console.log(tokens)
        const coinGekoToken = tokens?.find((item) => item.symbol.toLowerCase() === token.symbol.toLowerCase());
        if(!coinGekoToken) {
            console.log({ message: 'Token not found on coin gueko'})
            return CoinGeckoProvider.IconNotFoundSrc;
        }
        const coinGekoTokenDetails = await this.getTokenDetails(coinGekoToken.id);
        if(!coinGekoTokenDetails) {
            return CoinGeckoProvider.IconNotFoundSrc;
        }

        return coinGekoTokenDetails.image.small.replace(/\?[0-9]+$/, '');
    }

    public async getToken(address: string, chainId: string): Promise<Token|null> {
        const token = await getToken(connectKitConfig, {
            address: address as `0x${string}`,
            // @ts-ignore
            chainId: Number(chainId)
        });
        if(!token) {
            return null;
        }
        let logoUri = await this.getTokenIcon(token);
        console.log({ address, chainId, ...token, logoUri })

        return {
            address: token.address,
            decimals: token.decimals,
            symbol: token.symbol,
            name: token.name,
            chain_id: chainId,
            logo_uri: logoUri
        } satisfies Token
    }

}
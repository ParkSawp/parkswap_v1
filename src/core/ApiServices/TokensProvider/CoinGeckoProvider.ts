import ITokenProvider from "@/src/core/ApiServices/TokensProvider/ITokenProvider";
import { type Token } from "@/src/core/Models/TokenRepository";
import {getToken} from "@wagmi/core";
import config from '../../../app/config.js';


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

    public async getAll(): Promise<CoinGekoToken[]> {
        const tokenListResponse = await fetch(process.env['COIN_GECKO_TOKEN_URL']+'/list');
        const data = await tokenListResponse.json();
        return data || [];
    }
    public async getTokenDetails(id: string): Promise<CoinGekoTokenDetail> {
        const tokenResponse = await fetch(process.env['COIN_GECKO_TOKEN_URL']+'/'+id);
        return await tokenResponse.json();
    }

    public async getToken(address: string, chainId: string): Promise<Token|null> {
        const token = await getToken(config, {
            address: address as `0x${string}`,
            chainId: Number(chainId) as (1 | 137 | 8453)
        });
        if(!token) {
            return null;
        }

        const tokens = await this.getAll();
        const coinGekoToken = tokens.find((item) => item.symbol.toLowerCase() === token.symbol.toLowerCase());
        if(!coinGekoToken) {
            return null;
        }
        const coinGekoTokenDetails = await this.getTokenDetails(coinGekoToken.id);
        if(!coinGekoTokenDetails) {
            return null;
        }

        return {
            address: token.address,
            decimals: token.decimals,
            symbol: token.symbol,
            name: token.name,
            chain_id: chainId,
            logo_uri: coinGekoTokenDetails.image.small.replace(/\?[0-9]+$/, '')
        } satisfies Token
    }

}
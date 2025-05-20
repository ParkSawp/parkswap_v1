import ITokenProvider from "@/src/core/ApiServices/TokensProvider/ITokenProvider";
import { type Token } from "@/src/core/Models/TokenRepository";
import AlchemyProvider from "@/src/core/ApiServices/TokensProvider/AlchemyProvider";
import connectKitConfig from '../../../config/connectKitConfig.js';


type CoinGekoToken = {symbol: string, id: string, name: string};
type CoinGekoTokenDetail = {
    image: {
        small: string;
        thumb: string;
        large: string;
    }
    categories: string[]
}

export default class CoinGeckoProvider implements ITokenProvider {

    public static shared = new CoinGeckoProvider();
    public static IconNotFoundSrc = '/svg/tokens/icon.404.svg';
    public static allGekoTokens = [];
    public static allGekoTokensBySymbol = {};
    public static allGekoTokensByGekoId = {};

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
    public async getAll(): Promise<{ [key: string]: CoinGekoToken }> {
        if(CoinGeckoProvider.allGekoTokens.length > 0) {
            return CoinGeckoProvider.allGekoTokensBySymbol;
        }
        const tokenListResponse = await fetch(process.env['COIN_GECKO_TOKEN_URL']+'/list');
        const data = await tokenListResponse.json();
        if(Array.isArray(data)) {
            CoinGeckoProvider.allGekoTokens = data;
            data.forEach((item) => {
                CoinGeckoProvider.allGekoTokensBySymbol[item.symbol.toLowerCase()] = item;
                CoinGeckoProvider.allGekoTokensByGekoId[item.id] = item;
            });
            return CoinGeckoProvider.allGekoTokensBySymbol;
        }
        return {};
    }
    public async getTokenDetails(id: string): Promise<CoinGekoTokenDetail> {
        const coinGekoToken = CoinGeckoProvider.allGekoTokensByGekoId[id];
        if(coinGekoToken.details) {
            return coinGekoToken.details;
        }
        const tokenResponse = await fetch(process.env['COIN_GECKO_TOKEN_URL']+'/'+id);
        const details = await tokenResponse.json();
        if(details.status?.error_code) {
            return {} as CoinGekoTokenDetail;
        }
        coinGekoToken.details = details;
        return details;
    }

    public async getTokenIcon(token): Promise<string> {
        const tokens = await this.getAll();
        const coinGekoToken = tokens[token.symbol.toLowerCase()] ?? null;

        if(!coinGekoToken) {
            console.log({ message: 'Token not found on coin gueko', token: token.symbol })
            return CoinGeckoProvider.IconNotFoundSrc;
        }
        const coinGekoTokenDetails = await this.getTokenDetails(coinGekoToken.id);
        if(!coinGekoTokenDetails) {
            return CoinGeckoProvider.IconNotFoundSrc;
        }
        if(!coinGekoTokenDetails.image) {
            console.log({ message: 'Token image not found on coin gueko', token: token.symbol, geko: coinGekoTokenDetails});
            return CoinGeckoProvider.IconNotFoundSrc;
        }
        return coinGekoTokenDetails.image.small.replace(/\?[0-9]+$/, '');
    }

    public async getToken(address: string, chainId: string): Promise<Token|null> {
        const token = await AlchemyProvider.tokenMetaData(address, Number(chainId));
        console.log({
            searchToken: address,
            chainId,
            token
        })
        if(!token || !token.name) {
            return null;
        }
        let logoUri = token.logo;
        if(!logoUri) {
            logoUri = await this.getTokenIcon(token);
        }
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
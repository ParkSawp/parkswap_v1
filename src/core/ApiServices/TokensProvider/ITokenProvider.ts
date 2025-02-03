import { type Token } from '@/src/core/Models/TokenRepository';

export default interface ITokenProvider {

    getToken(address: string, chainId: string): Promise<Token|null>;

}
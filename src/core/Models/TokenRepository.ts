import {supabase} from "@/src/config/db";

export type Token = {
    name: string;
    address: string;
    symbol: string;
    logo_uri: string;
    decimals: number;
    toImport?: boolean;
    is_verify?: boolean;
    risk?: number;
    usd?: number;
    chain_id?: string|number;
};

export default class TokenRepository {

    private static table(): any {
        return supabase.from('tokens');
    }

    public static async getTokenByAddress(address: string, chainId: string|number): Promise<null|Token> {
        const { data } = await TokenRepository.table().select().eq('address', address).eq('chain_id', chainId);
        return data ? data[0] : null;
    }

    public static async create(token: Token): Promise<null|Token> {
        token.address = token.address.toLowerCase();
        const existingToken = await TokenRepository.getTokenByAddress(token.address, token.chain_id);
        if(existingToken) {
            return existingToken;
        }
        const { data, error } = await TokenRepository.table().insert(token).select();
        if(error) {
            console.error('ERROR: CREATE TOKEN ('+token.name+') : '+ token.address)
            return null;
        }
        const createdToken = data[0];
        console.log('CREATE TOKEN ('+token.name+') : '+ createdToken.address);
        return createdToken;
    }

    public static async getFromChainId(chainId: string): Promise<Token[]> {
        const { data: tokens } = await TokenRepository.table()
            .select()
            .eq('chain_id', chainId)
            .order('is_default', { ascending: true })
            .range(0, 100);
        return tokens || [];
    }

    public static update(token: Token): Promise<null|Token> {
        return null;
    }

}
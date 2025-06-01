import {supabase} from "@/src/config/db";
import {Token} from "@/src/core/Models/TokenRepository";
import {meta} from "eslint-plugin-react/lib/rules/jsx-props-no-spread-multi";
import description = meta.docs.description;


export default class WalletRepository {

    private static table(): any {
        return supabase.from('wallets');
    }


    public static async getWallets(): Promise<null|Token> {
        const { data } = await WalletRepository.table().select('name, description, address, id, image');
        return (data ?? []).map(wallet => ({ ...wallet, description: JSON.parse(wallet.description)}));
    }

    public static async update(id: number, data: {}): Promise<void> {
        await WalletRepository.table().update(data).eq('id', id);
    }


}
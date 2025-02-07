import {supabase} from "@/src/config/db";

export enum TransactionType {
    swap = 'swap',
    bridge = 'bridge',
    send = 'send',
    stake = 'stake',
}

export enum TransactionStatus {
    created = 'created',
    pending = 'pending',
    success = 'success',
    failed = 'failed',
    canceled = 'canceled',
}

export type Transaction = {
    id?: number;
    address: string;
    to: string;
    type: TransactionType;
    amount: string;
    chainId: string;
    from_token: string;
    to_token?: string;
    price?: number;
    fee?: string;
    fee_price?: number;
    slippage: number;
    hash: string;
    status: TransactionStatus;
    data: string;
    point: number;
    updated_at?: string;
    created_at?: string;
};

export default class TransactionRepository {
    private static table(): any {
        return supabase.from('transactions');
    }

    public static async getExistingTransaction({ address, type, from_token, to_token, to }: Transaction): Promise<null|Transaction> {
        const { data, error } = await TransactionRepository.table().select()
            .match({
                address,
                to,
                type,
                from_token,
                to_token
            });

        if(error) {
            console.log('ERROR: Error when try to find existing transaction', { address, type, from_token, to_token, to });
            return null;
        }

        return data[0] ?? null;
    }
    public static async getPendingSwapTransactions(): Promise<Transaction[]> {
        const { data } = await TransactionRepository.table()
            .select()
            .eq('status', TransactionStatus.pending);

        return data || [];
    }
    public static async getExpiredTransactions(time: number = 1): Promise<Transaction[]> {
        const timeAgo = (new Date((new Date()).getTime() - time*60000)).toISOString()
            .replace('T', ' ')
            .replace('Z', '');
        console.log(timeAgo);
        const { data } = await TransactionRepository.table()
            .select()
            .lte('created_at', timeAgo)
            .eq('status', TransactionStatus.created);

        return data || [];
    }
    public static async createTransaction(transaction: Transaction): Promise<null|Transaction> {
        const {data, error} = await TransactionRepository.table().insert({
            address: transaction.address,
            to: transaction.to,
            type: transaction.type,
            amount: transaction.amount,
            chainId: transaction.chainId,
            from_token: transaction.from_token,
            to_token: transaction.to_token,
            price: 0,
            fee: 0,
            fee_price: 0,
            slippage: transaction.slippage,
            hash: transaction.hash,
            status: transaction.status,
            data: transaction.data,
            point: transaction.point
        }).select();
        if(error || !data[0]) {
            console.error('ERROR: TRANSACTION NOT CREATED ('+error.message+') ');
            return null;
        }
        const createdTransaction = data[0];
        console.log('SUCCESS: TRANSACTION CREATED ('+createdTransaction.id+') ');
        return createdTransaction;
    }

    public static async createTransactionFromSwap(swap): Promise<null|Transaction> {
        const params: Transaction = {
            address: swap.taker,
            type: TransactionType.swap,
            data: JSON.stringify((swap.data ? swap.data : {})),
            point: 0,
            status: TransactionStatus.created,
            hash: null,
            slippage: (swap.slippage ? parseInt(swap.slippage, 10) : 0),
            amount: swap.amount,
            chainId: swap.chainId,
            from_token: swap.sellToken,
            to_token: swap.buyToken,
            to: swap.taker
        };
        await TransactionRepository.table().delete()
            .match({
                address: params.address,
                status: TransactionStatus.created,
            });
        return await TransactionRepository.createTransaction(params);
    }

    public static async updateTransactionStatus(transactionId: number, status: TransactionStatus): Promise<boolean> {
        const { error } = await TransactionRepository.table().update({
            status,
            updated_at: (new Date()).toISOString().replace('T', ' ').replace('Z', ''),
        }).match({ id: transactionId });

        return !error;
    }

    public static async updateTransactionHash(transactionId: number, hash: string): Promise<void> {
        const { error } = await TransactionRepository.table().update({
            status: TransactionStatus.pending,
            updated_at: (new Date()).toISOString().replace('T', ' ').replace('Z', ''),
            hash
        }).match({ id: transactionId, status: TransactionStatus.created });

        if(error) {
            console.log('ERROR: error while attempt to update transaction '+ error.message);
        }
    }

    public static async deleteByIds(ids: number[]): Promise<boolean> {
        const { error } = await TransactionRepository.table().delete().in('id', ids);
        return !error;
    }

}
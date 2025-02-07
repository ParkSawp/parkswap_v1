import { NextResponse } from 'next/server';
import BaseScam from "@/src/core/ApiServices/NetworkScam/BaseScam";
import TransactionRepository, {TransactionStatus} from "@/src/core/Models/TransactionRepository";

async function removeExpiredTransactions(){
    const transactions = await TransactionRepository.getExpiredTransactions(60);
    const transactionIds = transactions.map(({id}) => id);

    console.log('DELETE EXPIRED TRANSACTIONS: ', transactionIds);
    await TransactionRepository.deleteByIds(transactionIds);
}

async function updatePendingTransaction(transaction) {
    const transactionStatus = await BaseScam.getTransactionByHash(transaction.hash);
    if(transactionStatus.message === 'OK') {
        const status = (transactionStatus.result.isError === 1 ? TransactionStatus.failed : TransactionStatus.success);
        await TransactionRepository.updateTransactionStatus(transaction.id, status);
        console.log('Transaction updated status : '+transaction.hash+' -> to '+status);
    }
}
async function updatePendingTransactions() {
    const transactions = await TransactionRepository.getPendingSwapTransactions();

    for(const index in transactions) {
        await updatePendingTransaction(transactions[index]);
    }
}


export async function GET(request) {
    // if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return request.status(401).end('Unauthorized');
    // }

    await removeExpiredTransactions();
    await updatePendingTransactions();

    return NextResponse.json({
        ok: true,
        api: process.env.BASE_SCAM_API_KEYI
    });
}
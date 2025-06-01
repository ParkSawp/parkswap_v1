import * as fns from "date-fns";
import AlchemyProvider from "@/src/core/ApiServices/TokensProvider/AlchemyProvider";
import {ethers, formatEther, formatUnits} from "ethers";
import { ERC20_ABI } from '@/src/config/constants';
import * as net from "node:net";

type ParkswapLogFormat = {
    name: string;
    hash: string;
    asset: any[],
    args: {
        from?: string;
        to?: string;
        value?: string;
    };
}
type TransactionBlockLog = {
    transactionHash: string;
    contractAddress: string;
    logIndex: number;
    removed: boolean;
    topics: string[];
    data: string;
}
type TransactionBlock = {
    type: string;
    blockTimestamp: number;
    blockNumber: number;
    blockHash: string;
    nonce: string;
    transactionIndex: number;
    fromAddress: string;
    toAddress: string;
    network: string;
    contractAddress: string;
    value: string;
    gas: string;
    gasPrice: string;
    cumulativeGasUsed: string;
    effectiveGasPrice: string;
    gasUsed: string;
    logs: TransactionBlockLog[]
    internalTxns: any[]
}

export default class TransactionFormatter {

    public static getTransactionType(walletAddress: string, transaction: TransactionBlock, mainLogs: ParkswapLogFormat[]): string {
        if(mainLogs.length === 0) {
            return 'failed';
        }
        const firstLog = mainLogs[0];

        if(transaction.toAddress === walletAddress.toLowerCase()) {
            return 'receive';
        }

        if(mainLogs.length === 1 ) {
            if(mainLogs[0].name === 'Approval') {
                return 'approve';
            }
            if(mainLogs[0].name === 'Transfer') {
                if(firstLog.args.from.toLowerCase() === walletAddress.toLowerCase()) {
                    return 'send';
                }
                return 'receive';
            }
        }
        if(mainLogs.length > 1) {
            return 'trade'
        }

       return 'other';
    }

    public static async formatLog(log: TransactionBlockLog, iface: ethers.Interface, network): Promise<ParkswapLogFormat> {
        const details = iface.parseLog(log);

        const allStepAssets = [];
        let token = null;
        if(log.contractAddress) {
            token =  await AlchemyProvider.tokenMetaData(log.contractAddress, network.id);
            if(token) {
                await AlchemyProvider.loadTokenIcon(token, network.id);
            }
        }
        const args = details.args.map(arg => {
            if(typeof arg === 'bigint' || typeof arg === 'number') {
                return formatUnits(arg, token ? token.decimals : network.nativeCurrency.decimals);
            }
            return arg;
        });

        return {
            hash: log.transactionHash,
            name: details.name,
            asset: token,
            args: { from: args[0], to: args[1], value: (details.name === 'Approval' ? '' : args[2])},
        };
    }
    public static getTransactionMainLogs = (logs: ParkswapLogFormat[]) => {
        const results = [];
        if(logs.length > 0) {
            results.push(logs[0]);
        }
        if(logs.length > 1) {
            results.push(logs[logs.length - 1]);
        }
        return results;
    }
    public static async formatTransaction(transaction: TransactionBlock, walletAddress: string, iface: ethers.Interface): Promise<{[key: string]: any}> {
        const date = new Date(transaction.blockTimestamp);
        const day = fns.format(date, 'dd LLLL yyyy');

        const network = AlchemyProvider.getChainFromEnum(transaction.network);
        const logs = [];

        for await (const log of transaction.logs) {
            const logFormatted = await TransactionFormatter.formatLog(log, iface, network);
            logs.push(logFormatted);
        }
        const eventNames = logs.map(({ name }) => name);
        const mainLogs = TransactionFormatter.getTransactionMainLogs(logs);
        const firstLog = mainLogs[0];
        const lastLog = mainLogs[logs.length - 1];

        return {
            day,
            time: fns.format(date, 'HH:mm:ss'),
            hash: firstLog?.hash || transaction.blockHash,
            from: firstLog?.args?.from || transaction.fromAddress,
            to: lastLog?.args?.to || transaction.toAddress,
            contract: transaction.toAddress,
            timestamp: transaction.blockTimestamp,
            number: transaction.blockNumber,
            internal: transaction.internalTxns,
            gas: {
                gas: formatEther(parseInt(transaction.gas)),
                price: formatEther(parseInt(transaction.gasPrice)),
                priceGwei: (parseInt(transaction.gasPrice) / 1_000_000_000).toFixed(6),
                fee: formatEther(parseInt(transaction.gasPrice) * parseInt(transaction.gas)),

            },
            eventNames,
            type: TransactionFormatter.getTransactionType(walletAddress, transaction, mainLogs),
            network: {
                id: network.id,
                name: network.name,
                nativeCurrency: network.nativeCurrency,
                explorerUrl: network.blockExplorers.default.url
            },
            logs,
            mainLogs
        };
    }

    public static async formatByDate(transactions: TransactionBlock[], walletAddress: string): Promise<{date: string, transactions: any[]}[]> {
        const transactionsByDate: {[key: string]: {date: string, transactions: any[]}} = {};
        const iface = new ethers.Interface(ERC20_ABI);

        for await (const transaction of transactions) {
            const transactionFormatted = await TransactionFormatter.formatTransaction(transaction, walletAddress, iface);
            const day: string = transactionFormatted.day;
            transactionsByDate[day] = transactionsByDate[day] || { date: day, transactions: [] };
            transactionsByDate[day].transactions.push(transactionFormatted);
        }
        return Object.values(transactionsByDate);
    }

}
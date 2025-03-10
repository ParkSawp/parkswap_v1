import PriceFormatter from "@/src/core/Fotmatter/PriceFormatter";
import QuoteFormatter from "@/src/core/Fotmatter/QuoteFormatter";
import TransactionRepository from "@/src/core/Models/TransactionRepository";

type RouteFillItem = {
    from: string;
    to: string;
    source: string;
    proportionBps: string;
};
type RouteTokenItem = {
    address: string;
    symbol: string;
};
type ZeroExFee = {
    amount: string;
    token: string;
    type: string;
};

export type Price0X = {
    liquidityAvailable?: boolean;
    blockNumber?: string;
    buyToken?: string;
    buyAmount?: string;
    sellToken?: string;
    sellAmount?: string;
    fees?: {
        integratorFee?: string|null,
        zeroExFee: ZeroExFee,
        gasFee?: string|null;
    };
    gas?: string;
    gasPrice?: string;
    issues?: {
        allowance?: {
            actual?: string;
            spender?: string;
        },
        balance?: {
            token: string;
            actual: string;
            expected: string;
        },
        simulationIncomplete?: false,
        invalidSourcesPassed?: []
    };
    minBuyAmount?: string;
    route?: {
        fills: RouteFillItem[],
        tokens: RouteTokenItem[]
    };
    totalNetworkFee?: string;
};
export type Quote0X = Price0X;

const API_0X_URL = process.env.API_0X_URL;
const API_0X_VERSION = process.env.API_0X_VERSION;
const API_0X_KEY = process.env.API_0X_KEY;
const API_0X_ETH_ADDRESS = process.env.API_0X_ETH_ADDRESS;

export default class Ox {

    public static swap(): void {

    }

    private static getRealAddress = (address)=> {
        return (address === 'null' ? API_0X_ETH_ADDRESS: address);
    }

    public static async getPrice(amount: number, sellToken: string, buyToken: string, chainId: string, slippage: number, taker: string): Promise<Price0X> {
        const params = {
            chainId: chainId.toString(),
            sellToken: Ox.getRealAddress(sellToken),
            buyToken: Ox.getRealAddress(buyToken),
            sellAmount: amount.toString(),
        };
        console.log({ params })
        if(slippage) {
            params['slippageBps'] = (slippage * 100).toString();
        }
        if(taker) {
            params['taker'] = taker;
        }
        const priceParams = new URLSearchParams(params);

        const priceResponse = await Ox.fetch('/swap/permit2/price', priceParams);
        const data = await priceResponse.json();
        return PriceFormatter.formatFrom0X(data);
    }

    public static async placeOrder(amount: number, sellToken: string, buyToken: string, chainId: string, slippage: number, taker: string): Promise<Quote0X> {
        const params = {
            chainId: chainId.toString(),
            sellToken: Ox.getRealAddress(sellToken),
            buyToken: Ox.getRealAddress(buyToken),
            sellAmount: amount.toString(),
            taker,
            swapFeeToken: Ox.getRealAddress(sellToken),
            swapFeeRecipient: process.env.API_FEE_RECIPIENT,
            swapFeeBps: process.env.API_FEE_BPS
        };

        if(slippage) {
            params['slippageBps'] = slippage * 100;
        }
        console.log({ params })
        const priceParams = new URLSearchParams(params);

        const priceResponse = await Ox.fetch('/swap/permit2/quote', priceParams);
        const data = await priceResponse.json();
        const transaction = await TransactionRepository.createTransactionFromSwap({
            data,
            sellToken,
            buyToken,
            chainId,
            slippage,
            taker,
            amount
        });
        return QuoteFormatter.formatFrom0X({ transactionId: transaction?.id, ...data});
    }

    private static async fetch(urlPath: string, params: URLSearchParams): Promise<any> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "0x-api-key": API_0X_KEY,
            "0x-version": API_0X_VERSION,
        });

        return await fetch(API_0X_URL+`${urlPath}?` + params.toString(), { headers, });
    }

}
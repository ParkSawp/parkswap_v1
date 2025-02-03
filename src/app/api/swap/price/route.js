import { NextResponse } from "next/server";
import Ox from "@/src/core/ApiServices/Swap/Ox";


const API_0X_ETH_ADDRESS = process.env.API_0X_ETH_ADDRESS;

export async function GET(request) {
    const { searchParams } = request.nextUrl
    const { sellAddress, buyAddress, amount, slippage, chainId, taker } = Object.fromEntries(searchParams.entries())

    console.log({ sellAddress, buyAddress, amount, chainId, taker })

    if(!sellAddress) {
        return NextResponse.json({ error: 'Missing parameter "address"' }, { status: 400 });
    }

    const price = await Ox.getPrice(amount, sellAddress, buyAddress, chainId, slippage, taker);

    // Do whatever you want
    return NextResponse.json(price, { status: 200 });
}
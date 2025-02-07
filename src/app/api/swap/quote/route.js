import { NextResponse } from "next/server";
import Ox from "@/src/core/ApiServices/Swap/Ox";

export async function GET(request) {
    const { searchParams } = request.nextUrl
    const { sellAddress, buyAddress, slippage, amount, chainId, taker } = Object.fromEntries(searchParams.entries())
    if(!sellAddress) {
        return NextResponse.json({ error: 'Missing parameter "address"' }, { status: 400 });
    }
    const quote = await Ox.placeOrder(amount, sellAddress, buyAddress, chainId, slippage || 0, taker);

    // Do whatever you want
    return NextResponse.json(quote, { status: 200 });
}
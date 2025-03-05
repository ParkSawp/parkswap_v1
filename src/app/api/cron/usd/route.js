import { NextResponse } from 'next/server';
import AlchemyProvider from "@/src/core/ApiServices/TokensProvider/AlchemyProvider"


export async function GET(request) {
    // if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return request.status(401).end('Unauthorized');
    // }

    const data = await AlchemyProvider.usd(['ETH', 'BTC']);

    return NextResponse.json({
        ok: true,
        api: process.env.ALCHEMY_API_KEY,
        data
    });
}
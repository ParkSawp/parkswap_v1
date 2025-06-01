import {NextResponse} from "next/server";
import WalletRepository from "@/src/core/Models/WalletRepository";
import AlchemyProvider from "@/src/core/ApiServices/TokensProvider/AlchemyProvider";

export async function GET(request) {
    // if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    //     return request.status(401).end('Unauthorized');
    // }

    const wallets = await WalletRepository.getWallets();

    for await (const wallet of wallets) {
        try {
            const assets = await AlchemyProvider.walletTokens(wallet.address);
            wallet.assets = assets.tokens;
            const description = JSON.stringify({
                amount: assets.amount,
                assets: wallet.assets.splice(0, 10)
            });
            await WalletRepository.update(wallet.id, { description, tokens: assets.tokens });
        } catch (error) {
            console.log(error.message);
        }
    }



    return NextResponse.json({
        ok: true,
        api: '',
        apiKezy: process.env.BASE_SCAM_API_KEYI,
        wallets
    });
}
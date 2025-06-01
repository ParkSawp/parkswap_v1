import { NextResponse } from "next/server";
import TokenProvider from "@/src/core/ApiServices/TokensProvider/TokenProvider";
import WalletRepository from "@/src/core/Models/WalletRepository";

export async function GET(request) {
    const wallets = await WalletRepository.getWallets();
    // Do whatever you want
    return NextResponse.json(wallets, { status: 200 });
}

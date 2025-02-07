import { NextResponse } from "next/server";
import Ox from "@/src/core/ApiServices/Swap/Ox";
import TransactionRepository from "@/src/core/Models/TransactionRepository";

export async function GET(request) {
    const { searchParams } = request.nextUrl
    const { transactionId, hash  } = Object.fromEntries(searchParams.entries())
    if(!transactionId) {
        return NextResponse.json({ error: 'Missing parameter "tId" as transactionId' }, { status: 400 });
    }

    await TransactionRepository.updateTransactionHash(transactionId, hash);

    // Do whatever you want
    return NextResponse.json({}, { status: 200 });
}
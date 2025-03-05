import { NextResponse } from "next/server";
import TokenProvider from "@/src/core/ApiServices/TokensProvider/TokenProvider";

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const { chainId, walletAddress, search } = Object.fromEntries(searchParams.entries());

  const tokens = await TokenProvider.tokens(chainId, walletAddress, search);
  // Do whatever you want
  return NextResponse.json(tokens, { status: 200 });
}

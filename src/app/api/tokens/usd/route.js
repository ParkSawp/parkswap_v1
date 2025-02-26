import { NextResponse } from "next/server";
import TokenProvider from "@/src/core/ApiServices/TokensProvider/TokenProvider";
import CoinGeckoProvider from "@/src/core/ApiServices/TokensProvider/CoinGeckoProvider";

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const { name, symbol } = Object.fromEntries(searchParams.entries());

  const response = await CoinGeckoProvider.shared.getTokenUsdPrice(name, symbol);
  // Do whatever you want
  return NextResponse.json(response, { status: 200 });
}

import { NextResponse } from "next/server";
import AlchemyProvider from "@/src/core/ApiServices/TokensProvider/AlchemyProvider";

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const { name, symbol } = Object.fromEntries(searchParams.entries());

  const response = await AlchemyProvider.usd(symbol);
  // Do whatever you want
  return NextResponse.json(response, { status: 200 });
}

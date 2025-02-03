import { NextResponse } from "next/server";
import TokenProvider from "@/src/core/ApiServices/TokensProvider/TokenProvider";

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const { chainId, search } = Object.fromEntries(searchParams.entries());

  const tokens = await TokenProvider.tokens(chainId, search);
  // Do whatever you want
  return NextResponse.json(tokens, { status: 200 });
}

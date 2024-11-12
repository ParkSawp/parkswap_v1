import { NextResponse } from "next/server";

export async function GET(request) {
  const data = [
    {
      token: {
        address: 'x04451...78459',
        name: 'Ether',
        currency: 'ETH'
      },
      price: 3350.20,
      durations: {
        '1H': {value: '0.5%', up: true },
        '24H': {value: '20%', up: false },
        '7D': {value: '0.5%', up: true },
      },
      tradingVolume: 33230511,
      marketCap: 401650280880,
      parkswapTvl: 275862953,
      stats: []
    },
    {
      token: {
        address: 'x04451...845921',
        name: 'Tether USD',
        currency: 'USDT'
      },
      price: 1.0,
      durations: {
        '1H': {value: '0.3%', up: false },
        '24H': {value: '0.2%', up: true },
        '7D': {value: '0.5%', up: false },
      },
      tradingVolume: 320230511,
      marketCap: 124650280880,
      parkswapTvl: 62862953,
      stats: []
    },
  ]
  // Do whatever you want
  return NextResponse.json(data, { status: 200 });
}

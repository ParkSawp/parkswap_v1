import { NextResponse } from "next/server";

export async function GET(request) {
    const data = JSON.parse([
        {},
        {},
    ]);
    // Do whatever you want
    return NextResponse.json(data, { status: 200 });
}

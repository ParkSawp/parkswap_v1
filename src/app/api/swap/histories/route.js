import { NextResponse } from "next/server";

export async function GET(request) {
    const data = [
        {},
        {},
    ];
    // Do whatever you want
    return NextResponse.json(data, { status: 200 });
}

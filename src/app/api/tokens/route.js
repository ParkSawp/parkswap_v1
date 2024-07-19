import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
  const filePath = path.join(process.cwd(), "./public/tokens.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  // Do whatever you want
  return NextResponse.json(data, { status: 200 });
}

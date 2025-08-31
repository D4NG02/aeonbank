import { NextResponse } from "next/server";
import RandomString from "../RandomString";

export async function GET() {
  const secureWord = RandomString();
  return NextResponse.json(secureWord, { status: 200 });
}


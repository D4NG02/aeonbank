import { NextResponse } from "next/server";

export async function GET() {
  const secureWord = generateBasicRandomString(10);
  return NextResponse.json(secureWord, { status: 200 });
}

function generateBasicRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

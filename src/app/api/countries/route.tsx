import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  const file = await fs.readFile("src/app/data/countries.json", "utf8");
  const result = JSON.parse(file).map((country: { name: string }) => {
    return country.name;
  });

  return NextResponse.json({ result });
}

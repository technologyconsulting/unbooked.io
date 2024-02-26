import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

interface City {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: string;
  longitude: string;
  wikiDataId: string;
}

export async function GET(request: NextRequest) {
  const country = request.nextUrl.searchParams.get("country");
  const filePath = path.join(process.cwd(), "src/app/data/cities.json");
  const file = await fs.readFile(filePath, "utf8");
  const result: City[] = JSON.parse(file)
    .filter((city: City) => {
      return city.country_name === country;
    })
    .map((city: City) => {
      return city;
    });

  return NextResponse.json({ result });
}

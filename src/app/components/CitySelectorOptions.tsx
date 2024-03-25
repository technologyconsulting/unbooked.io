"use server";
import React from "react";
import { promises as fs } from "fs";
import path from "path";
// import useSWR from "swr";

interface CitySelectorOptionsProps {
  country: string;
}

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

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CitySelectorOptions = async (country: any) => {
  // const { data, error, isLoading } = useSWR(
  //   `/api/cities?country=${country}`,
  //   fetcher,
  // );

  // if (error) return <option>failed to load</option>;
  // if (isLoading) return <option>loading...</option>;

  // const results = data?.result;
  // .sort((a: City, b: City) =>
  //   a.name.localeCompare(b.name),
  // );
  // .map((city: City) => {
  //   return (
  //     <option key={city.id} className="text-black">
  //       {city.name}
  //     </option>
  //   );
  // });
  // return results;

  const filePath = path.join(process.cwd(), "src/app/data/cities.json");
  const file = await fs.readFile(filePath, "utf8");
  const result: City[] = JSON.parse(file)
    .filter((city: City) => {
      return city.country_name === country;
    })
    .map((city: City) => {
      return city;
    });

  return result;
};

export default CitySelectorOptions;

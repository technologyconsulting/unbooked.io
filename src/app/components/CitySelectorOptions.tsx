import React from "react";
import useSWR from "swr";

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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CitySelectorOptions: React.FC<CitySelectorOptionsProps> = ({
  country,
}) => {
  const { data, error, isLoading } = useSWR(
    `"/api/cities?country=${country}"`,
    fetcher,
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <option>loading...</option>;

  const results = data?.result
    .sort((a: City, b: City) => a.name.localeCompare(b.name))
    .map((city: City) => {
      return (
        <option key={city.id} className="text-black">
          {city.name}
        </option>
      );
    });
  return results;
};

export default CitySelectorOptions;

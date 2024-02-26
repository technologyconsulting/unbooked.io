import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CountryOptionsSelector() {
  const { data, error, isLoading } = useSWR("/api/countries", fetcher);

  if (error) return <option>failed to load</option>;
  if (isLoading) return <option>loading...</option>;

  const results = data?.result.map((country: string) => {
    return (
      <option key={country} className="text-black">
        {country}
      </option>
    );
  });

  return results;
}

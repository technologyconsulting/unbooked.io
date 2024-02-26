import React from "react";
import { useInterestedStore } from "../state/interestedState";
import CitySelectorOptions from "./CitySelectorOptions";

interface CitySelectorProps {
  countryZ: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({ countryZ }) => {
  const imInterested = useInterestedStore((state) => state);

  function updatingCity(e: string) {
    imInterested.updateImInterested({ city: e });
  }
  return (
    <div className="w-[48%]">
      <label
        htmlFor="city"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Nearest town or city
      </label>
      <select
        id="city"
        name="city"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        // defaultValue="Tring"
        onChange={(e) => updatingCity(e.target.value)}
      >
        <option key="PleaseSelect" className="text-black">
          Please Select
        </option>
        <CitySelectorOptions country={countryZ} />
      </select>
    </div>
  );
};

export default CitySelector;

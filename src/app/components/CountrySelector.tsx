import React from "react";
import { useInterestedStore } from "../state/interestedState";
import CountryOptionsSelector from "./CountryOptionsSelector";

export default function CountrySelector() {
  const imInterested = useInterestedStore((state) => state);

  function updatingCountry(e: string) {
    imInterested.updateImInterested({ country: e });
  }

  return (
    <div className="w-[48%]">
      <label
        htmlFor="country"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Country
      </label>
      <select
        id="country"
        name="country"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        // defaultValue={imInterested.interestedForm.country}
        onChange={(e) => updatingCountry(e.target.value)}
      >
        <option key="Please Select" className="text-black">
          Please Select
        </option>
        <option key="UK" className="text-black">
          United Kingdom
        </option>
        <CountryOptionsSelector />
      </select>
    </div>
  );
}

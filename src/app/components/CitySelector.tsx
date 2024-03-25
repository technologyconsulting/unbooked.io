"use client";
import React, { useState, useEffect } from "react";
import { useInterestedStore } from "../state/interestedState";
import CitySelectorOptions from "./CitySelectorOptions";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

interface CitySelectorProps {
  countryZ: string;
}

interface City {
  id: number;
  name?: string;
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

//

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const CitySelector: React.FC<CitySelectorProps> = ({ countryZ }) => {
  const [people, setPeople] = useState([]);
  // const people =
  // [
  //   { id: 1, name: "Leslie Alexander", username: "@lesliealexander" },
  // ];

  useEffect(() => {
    // let getPeople;
    // countryZ
    //   ? (getPeople = () => {
    //       const data = CitySelectorOptions(countryZ);
    //       return data;
    //     })
    //   : setPeople(getPeople);
  }, [countryZ]);

  // CitySelectorOptions(countryZ);
  const imInterested = useInterestedStore((state) => state);

  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  function updatingCity(e: string) {
    imInterested.updateImInterested({ city: e });
  }

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person: City) => {
          return person.name?.toLowerCase().includes(query.toLowerCase());
        });

  return (
    // <></>
    // <div className="w-[48%]">
    //   <label
    //     htmlFor="city"
    //     className="block text-sm font-medium leading-6 text-gray-900"
    //   >
    //     Nearest town or city
    //   </label>
    //   <select
    //     id="city"
    //     name="city"
    //     className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //     // defaultValue="Tring"
    //     onChange={(e) => updatingCity(e.target.value)}
    //   >
    //     <option key="PleaseSelect" className="text-black">
    //       Please Select
    //     </option>
    //     <CitySelectorOptions country={countryZ} />
    //   </select>
    // </div>

    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Nearest town or city {query}
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person: City) => person?.name || ""}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person: any) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900",
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={classNames(
                          "truncate",
                          selected ? "font-semibold" : "",
                        )}
                      >
                        {person.name}
                      </span>
                      <span
                        className={classNames(
                          "ml-2 truncate text-gray-500",
                          active ? "text-indigo-200" : "text-gray-500",
                        )}
                      >
                        {person.state_name}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600",
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default CitySelector;

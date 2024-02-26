import { create } from "zustand";
// import { persist } from "zustand/middleware";

type State = {
  countryZ: string;
};

type Action = {
  updateCountry: (countryZ: State["countryZ"]) => void;
};

export const useCountryStore = create<State & Action>()(
  // persist(
  (set) => ({
    countryZ: "",
    updateCountry: (newCountry) => set(() => ({ countryZ: newCountry })),
  }),
  //   { name: "country-store", skipHydration: true },
  // ),
);

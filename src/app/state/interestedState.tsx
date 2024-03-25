import { StateCreator, create } from "zustand";
import zukeeper from "zukeeper";

type State = {
  interestedForm: {
    interested: string;
    email: string;
    businessName: string;
    postcode: string;
    // country: string;
    // city: string;
  };
};

type Action = {
  updateImInterested: (update: Partial<State["interestedForm"]>) => void;
  reset: () => void;
};

const initialState: State = {
  interestedForm: {
    interested: "Personally",
    email: "",
    businessName: "",
    postcode: "",
    // country: "",
    // city: "",
  },
};

export const useInterestedStore = create<State & Action>(
  zukeeper((set: any) => ({
    ...initialState,

    updateImInterested: (update: Partial<State["interestedForm"]>) =>
      set((state: State) => ({
        interestedForm: {
          ...state.interestedForm,
          ...update,
        },
      })),

    reset: () => {
      set(initialState);
    },
  })),
);

// window.store = useInterestedStore;

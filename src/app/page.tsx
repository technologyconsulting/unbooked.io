"use client";
import { useEffect, useState, FormEvent } from "react";
import { useInterestedStore } from "./state/interestedState";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import CountrySelector from "./components/CountrySelector";
import CitySelector from "./components/CitySelector";

//* Supabase
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface MailListItem {
  id: number;
  title: string;
  description: string;
  users: string;
}

const interestedWhy = [
  {
    id: 1,
    title: "Personally",
    description: "Time saving and convenient bookings",
    users: "621 users",
  },
  {
    id: 2,
    title: "Business Owner",
    description: "Greater opportunities using our smarter marketplace",
    users: "1200 users",
  },
  {
    id: 3,
    title: "Both",
    description: "Let's strengthen that work life balance",
    users: "2740 users",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const imInterested = useInterestedStore((state) => state);
  const [why, setWhy] = useState(interestedWhy[2]);
  const [thankyou, setThankyou] = useState(false);

  useEffect(() => {
    // useCountryStore.persist.rehydrate();
  }, []);

  function updatingImInterested(why: MailListItem) {
    console.log(`Triggered`);
    imInterested.updateImInterested({ interested: why.title });
    console.log(imInterested);
  }
  function updatingEmail(email: string) {
    imInterested.updateImInterested({ email: email });
  }

  async function sendToSupabase(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, error } = await supabase.from("prelaunch_interested").insert([
      {
        email: imInterested.interestedForm.email,
        interested: imInterested.interestedForm.interested,
        country: imInterested.interestedForm.country,
        city: imInterested.interestedForm.city,
      },
    ]);
    setThankyou(true);
    setWhy(interestedWhy[2]);
    imInterested.reset();

    console.log(error);
  }

  return (
    <div className=" relative isolate m-auto pt-14">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-red-50">
          <path
            d="M-100.5 0h201v201h-201Z M100.5 200h201v201h-201Z M-100.5 400h201v201h-201Z M-100.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center lg:mx-0 lg:flex-auto">
          <div className="flex">
            <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              <span className="font-semibold text-[#ff5757]">Coming Soon</span>
            </div>
          </div>
          <h1 className="relative mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            unbooked
            <span className="absolute top-[-10px] text-[16px] sm:top-0 sm:text-[24px]">
              &#174;
            </span>{" "}
          </h1>
          <p className="mt-6 text-center text-2xl leading-8 text-gray-600">
            a marketplace where community and local business can connect and
            grow.
          </p>
          {thankyou ? (
            <p className="mt-6 text-center text-2xl leading-8 text-[#ff5757]">
              Thank you for your interest
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                sendToSupabase(e);
              }}
              className="mt-10 max-w-xl"
            >
              {/* Interested */}
              <RadioGroup value={why} onChange={setWhy}>
                <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
                  Interested? Tell us why
                </RadioGroup.Label>

                <div className="my-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                  {interestedWhy.map((why) => (
                    <RadioGroup.Option
                      key={why.id}
                      value={why}
                      className={({ active }) =>
                        classNames(
                          active
                            ? "border-[#ff5757] ring-2 ring-[#ff5757]"
                            : "border-gray-300",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
                        )
                      }
                      onClick={() => updatingImInterested(why)}
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1 ">
                            <span className="flex w-full flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="flex justify-between text-sm font-medium text-gray-900"
                              >
                                {why.title}
                                <CheckCircleIcon
                                  className={classNames(
                                    !checked ? "invisible" : "",
                                    "h-5 w-5 text-[#ff5757]",
                                  )}
                                  aria-hidden="true"
                                />
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-[#ff5757]"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-lg",
                                  )}
                                  aria-hidden="true"
                                />
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-4 flex items-center justify-start text-sm text-gray-500"
                              >
                                {why.description}
                              </RadioGroup.Description>
                              {/* <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {why.users}
                              </RadioGroup.Description> */}
                            </span>
                          </span>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              {/* Email Address */}
              <div className="mb-4 flex flex-col flex-wrap gap-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={imInterested.interestedForm.email}
                  onChange={(e) => updatingEmail(e.target.value)}
                  required
                  className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#ff5757] sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
              </div>
              {/* Location */}
              <div className="mb-4 flex w-full flex-wrap justify-between">
                <CountrySelector />
                <CitySelector countryZ={imInterested.interestedForm.country} />
              </div>
              {/* Submit */}
              <div className="my-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <button
                  type="submit"
                  className="flex-none rounded-md bg-[#ff5757] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#ff4242] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5757] md:col-start-2"
                >
                  I&apos;m Interested
                </button>
              </div>
              {/* <p className="mt-4 text-sm leading-6 text-gray-900">
                  We care about your data. Read our{" "}
                  <a
                    href="#"
                    className="font-semibold text-[#ff5757] hover:text-[#ff4242]"
                  >
                    privacy&nbsp;policy
                  </a>
                  .
                </p> */}
            </form>
          )}
        </div>
      </div>
      <p className="mt-4 max-w-xl text-right text-sm leading-6 text-gray-900 lg:mx-auto">
        We care about your data. Read our{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-[#ff5757] hover:text-[#ff4242]"
        >
          privacy&nbsp;policy
        </Link>
        .
      </p>
    </div>
  );
}

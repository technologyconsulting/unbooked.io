import React from "react";

function PartnerConditions() {
  return (
    <div className="relative isolate mx-auto max-w-4xl px-8 pt-24 text-black md:min-w-56">
      <h1 className="relative mt-0 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
        unbooked
        <span className="absolute top-[-10px] text-[16px] sm:top-0 sm:text-[24px]">
          &#174;
        </span>{" "}
      </h1>
      <p className="text-md mt-6 text-left leading-8 text-gray-600">
        Partner Conditions
      </p>
      <p className="text-md mt-6 text-left leading-8 text-gray-600">
        1. <span className="text-[#ff5757]">Zero Platform Fees</span>
        <br /> unbooked.io uses a platform transaction fee (PTF) model on
        bookings for non-partners made after the 3rd day. This means if you have
        availability every day during the week and today is Monday, then there
        are zero platform transaction fees (PTF) for bookings made for Monday,
        Tuesday and Wednesday. This is part of the freemium model for all
        business customers.
        <br />
        <br /> If today is Monday and a booking is made for Thursday, Friday,
        Saturday or Sunday, then a platform transaction fee is applied for each
        booking.
        <br />
        <br /> * Partners get zero platform transaction fees applied. This does
        not include debt or credit card transaction fees applied by 3rd parties.
      </p>
    </div>
  );
}

export default PartnerConditions;

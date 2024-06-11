"use client";

import { User } from "@prisma/client";
import { BiSearch } from "react-icons/bi";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import useRentModal from "@/app/hooks/useRentModal";
import useCountries from "@/app/hooks/useCountries";
import React, { useCallback, useMemo } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useSearchModal from "@/app/hooks/useSearchModal";

interface SearchProps {
  currentUser?: User | null;
}

const Search: React.FC<SearchProps> = ({ currentUser }) => {
  const params = useSearchParams();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const searchModal = useSearchModal();
  const { getByValue } = useCountries();

  const endDate = params?.get("endDate");
  const startDate = params?.get("startDate");
  const guestCount = params?.get("guestCount");
  const locationValue = params?.get("locationValue");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const end = new Date(endDate as string);
      const start = new Date(startDate as string);

      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Day";
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // open rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="w-full py-2 z-50 border-b-[1px] md:w-auto rounded-full shadow-inner shadow-alphaColor hover:shadow-md transition cursor-pointer capitalize"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-secondaryFont font-semibold px-6 hover:text-accentColor2">
          {locationLabel}
        </div>

        <div className="hidden sm:block text-sm font-secondaryFont font-semibold px-6 border-x-[1px] flex-1 text-center hover:text-accentColor2">
          {durationLabel}
        </div>

        <div className="text-sm pl-6 pr-2 text-primaryColor flex flex-row items-center gap-3">
          <div className="hidden sm:block font-secondaryFont hover:text-accentColor2">
            {guestLabel}
          </div>
        </div>

        <div className="text-sm pl-6 pr-2 text-primaryColor flex flex-row items-center gap-3">
          <div
            className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-betaColor hover:text-textLight shadow-sm bg-alphaColor hover:shadow-md transition cursor-pointer capitalize font-secondaryFont"
            onClick={onRent}
          >
            mungeBnB your home
          </div>

          <div className="p-2.5 mr-2 bg-secondaryColor text-white rounded-full">
            <BiSearch size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

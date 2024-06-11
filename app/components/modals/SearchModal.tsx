"use client";

import qs from "query-string";
import Modals from "./Modals";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";
import { Range } from "react-date-range";
import { useCallback, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSearchModal from "@/app/hooks/useSearchModal";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
  INFO = 2,
  DATE = 1,
  LOCATION = 0,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useParams();
  const searchModal = useSearchModal();

  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [step, setStep] = useState(STEPS.LOCATION);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    key: "selection",
    endDate: new Date(),
    startDate: new Date(),
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue: location?.value,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    params,
    onNext,
    router,
    location,
    roomCount,
    dateRange,
    guestCount,
    searchModal,
    bathroomCount,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        center
        title="Where do you wanna go?"
        subtitle="Get listings for your desired location"
      />

      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />

      <hr />

      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="when do you plan to go?"
          subtitle="select convinient dates for your planned visit"
        />

        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="more listing info"
          subtitle="Select Specifications you like for you listing"
        />

        <Counter
          title="Guests"
          value={guestCount}
          subTitle="How many guest are coming?"
          onChange={(value) => setGuestCount(value)}
        />
        <hr />
        <Counter
          title="Rooms"
          value={roomCount}
          subTitle="How many rooms do you need?"
          onChange={(value) => setRoomCount(value)}
        />
        <hr />
        <Counter
          title="bathrooms"
          value={bathroomCount}
          subTitle="How many bathrooms are needed?"
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modals
      title="Filters"
      body={bodyContent}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
    />
  );
};

export default SearchModal;

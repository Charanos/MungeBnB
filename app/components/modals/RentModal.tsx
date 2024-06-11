"use client";

import axios from "axios";
import Modals from "./Modals";
import Heading from "../Heading";
import dynamic from "next/dynamic";
import Inputs from "../inputs/Inputs";
import Counter from "../inputs/Counter";
import { useRouter } from "next/navigation";
import ImageUpload from "../inputs/ImageUpload";
import React, { useMemo, useState } from "react";
import { categories } from "../Navbar/Categories";
import useRentModal from "@/app/hooks/useRentModal";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

enum STEPS {
  INFO = 2,
  PRICE = 5,
  IMAGES = 3,
  CATEGORY = 0,
  LOCATION = 1,
  DESCRIPTION = 4,
}

const RentModal = () => {
  const router = useRouter();

  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      price: 1,
      title: "",
      imageSrc: "",
      category: "",
      roomCount: 1,
      guestCount: 1,
      location: null,
      description: "",
      bathroomCount: 1,
    },
  });

  const imageSrc = watch("imageSrc");
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Sommething went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        center
        subtitle="pick a category"
        title="which of these best describes your ideal place"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 gap-3 max-h-[50vh] overflow-y-auto ">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
              onClick={(category) => setCustomValue("category", category)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="where are you located"
          subtitle="let your guests know where you @"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="share some basic info about your bnb"
          subtitle="let your guests know what amenities you got"
        />

        <Counter
          title="Guests"
          value={guestCount}
          subTitle="How many guests do you allow?"
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />

        <Counter
          title="Rooms"
          value={roomCount}
          subTitle="How many rooms do you have?"
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />

        <Counter
          title="Bathrooms"
          value={bathroomCount}
          subTitle="How many bathrooms do you have?"
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
        <hr />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="upload images of you place"
          subtitle="show your guest interior and exterior pictures of your bnB"
        />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="add a few cooments about the place"
          subtitle="highlight core features of you bnB"
        />
        <Inputs
          required
          id="title"
          label="Title"
          errors={errors}
          register={register}
          disabled={isLoading}
        />
        <Inputs
          required
          errors={errors}
          id="description"
          label="Description"
          register={register}
          disabled={isLoading}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          center
          title="add a price for your rent"
          subtitle="how much your charge per night in you bnB"
        />

        <Inputs
          required
          id="price"
          formatPrice
          label="Price"
          type="number"
          errors={errors}
          register={register}
          disabled={isLoading}
        />
      </div>
    );
  }

  return (
    <Modals
      body={bodyContent}
      isOpen={rentModal.isOpen}
      actionLabel={actionLabel}
      title="MungeBnB your home"
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default RentModal;

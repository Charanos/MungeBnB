"use client";

import Avatar from "../Avatar";
import dynamic from "next/dynamic";
import { User } from "@prisma/client";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import useCountries from "@/app/hooks/useCountries";

interface ListingInfoProps {
  user: User;
  roomCount: number;
  guestCount: number;
  description: string;
  bathroomCount: number;
  locationValue: string;
  category: { icon: IconType; label: string; description: string } | undefined;
}

const Map = dynamic(() => import("../Map"), { ssr: false });

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  roomCount,
  guestCount,
  description,
  locationValue,
  bathroomCount,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 text-lg font-semibold font-secondaryFont items-center">
          <div className="">Hosted By: {user?.name}</div>
          <Avatar src={user?.image} />
        </div>

        <div className="flex flex-row items-center gap-4 font-light text-betaColor">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr />

      <div className="text-lg">{description}</div>

      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;

"use client";

import { IconType } from "react-icons";

interface ListingCategoryProps {
  label: string;
  icon: IconType;
  description: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  label,
  icon: Icon,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className=" text-secondaryColor" />

        <div className="flex flex-col">
          <div className="text-lg font-semibold text-accentColor">{label}</div>

          <div className="font-light text-betaColor">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;

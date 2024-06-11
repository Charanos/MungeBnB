import React from "react";
import Container from "../Container";
import { BsSnow } from "react-icons/bs";
import CategoryBox from "../CategoryBox";
import { FaSkiing } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiCactus,
  GiCastle,
  GiIsland,
  GiWindmill,
  GiForestCamp,
  GiBoatFishing,
  GiCaveEntrance,
  GiHut,
} from "react-icons/gi";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close proximity to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property has modern facilities!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has pool facilities!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is located on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property has a castle architectural design!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has a camping activities!",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This property is located in a snowy region!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property has caves in the vicinity!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is located in a desert region!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property has barns in the vicinity!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property has luxury amenities!",
  },
  {
    label: "Ghetto",
    icon: GiHut,
    description: "This property is ghetto!",
  },
];

const Categories = () => {
  const pathName = usePathname();
  const params = useSearchParams();
  const category = params?.get("category");
  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="flex pt-28 flex-row justify-between items-center overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            icon={item.icon}
            label={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;

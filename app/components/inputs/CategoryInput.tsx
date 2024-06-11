"use client";
import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  onClick,
  selected,
  icon: Icon,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`p-3 gap-3 transition flex flex-col shadow-inner hover:shadow-md rounded-xl md:hover:scale-105 hover:bg-alphaColor  cursor-pointer ${
        selected ? "bg-alphaColor" : "bg-textLight"
      }`}
    >
      <Icon size={20} />

      <div className="font-medium">{label}</div>
    </div>
  );
};

export default CategoryInput;

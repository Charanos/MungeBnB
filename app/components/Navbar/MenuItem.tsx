"use client";

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-5 hover:bg-alphaColor transition font-semibold uppercase"
    >
      {label}
    </div>
  );
};

export default MenuItem;

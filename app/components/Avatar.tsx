"use client";

interface AvatarProps {
  src?: string | null | undefined;
}

import Image from "next/image";

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      width="30"
      height="30"
      alt="avatar"
      className="rounded-full"
      src={src || "/images/avatar.png"}
    />
  );
};

export default Avatar;

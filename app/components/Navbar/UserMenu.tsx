"use client";

interface UserMenuProps {
  currentUser?: User | null;
}

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const router = useRouter();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // open rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="p-3 md:py-1.5 md:px-3 text-secondaryColor flex flex-row items-center gap-3 rounded-full border-b-[1px] shadow-alphaColor shadow-inner hover:shadow-md cursor-pointer  transition"
        >
          <AiOutlineMenu size={23} />

          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md min-w-[60vw] md:min-w-[20vw] bg-textLight overflow-hidden right-0 top-16 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="my trips"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="my favorites"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="my reservations"
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="my properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="mungeBnB my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="login" />
                <MenuItem onClick={registerModal.onOpen} label="sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

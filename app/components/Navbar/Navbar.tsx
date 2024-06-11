"use client";

interface NavbarProps {
  currentUser?: User | null;
}

import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Container from "../Container";
import { User } from "@prisma/client";
import Categories from "./Categories";
import React, { useState, useEffect } from "react";

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full z-[999] transition-all duration-300 fixed top-2  ${
          isScrolled
            ? "bg-textLight/40 z-[999] backdrop-blur-md shadow-lg rounded-full md:max-w-[98%] top-[2.6803rem] grid place-self-center self-center md:mx-2 lg:mx-4 w-full"
            : "bg-transparent"
        }`}
      >
        <div className="py-4">
          <Container>
            <div className="flex z-[999] flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <Search currentUser={currentUser} />
              <UserMenu currentUser={currentUser} />
            </div>
          </Container>
        </div>
      </div>
      <Categories />
    </>
  );
};

export default Navbar;

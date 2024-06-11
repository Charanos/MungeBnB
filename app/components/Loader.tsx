"use client";

import { ClockLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <ClockLoader size={100} color="#b59c53" />
    </div>
  );
};

export default Loader;

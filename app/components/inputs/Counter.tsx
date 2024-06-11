"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  value: number;
  subTitle: string;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  value,
  title,
  onChange,
  subTitle,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-textDark">{subTitle}</div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-betaColor hover:shadow-md text-textDark cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </div>

        <div className="font-semibold text-betaColor text-xl">{value}</div>

        <div
          onClick={onAdd}
          className="flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-betaColor hover:shadow-md text-textDark cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;

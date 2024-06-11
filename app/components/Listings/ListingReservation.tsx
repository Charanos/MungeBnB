"use client";

import Button from "../Button";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  disabled: boolean;
  totalPrice: number;
  onSubmit: () => void;
  disabledDates: Date[];
  onChangeDate: (value: Range) => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  disabled,
  onSubmit,
  dateRange,
  totalPrice,
  disabledDates,
  onChangeDate,
}) => {
  return (
    <div className="rounded-xl bg-textLight border-[1px] border-alphaColor overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price} </div>

        <div className="font-light text-betaColor">/ Night</div>
      </div>

      <hr />

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />

      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>

      <div className="p-4 flex flex-row items-center justify-between text-lg font-semibold font-secondaryFont">
        <div>Total: </div>
        <div>$ {totalPrice} </div>
      </div>
    </div>
  );
};

export default ListingReservation;

"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      minDate={new Date()}
      showDateDisplay={false}
      rangeColors={["#262626"]}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;

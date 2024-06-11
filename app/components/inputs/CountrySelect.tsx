"use client";

import Select from "react-select";
import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  value: string;
  region: string;
  latlng: number[];
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        value={value}
        isClearable
        options={getAll()}
        placeholder="Anywhere"
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>

            <div>
              {option.label},
              <span className="text-betaColor ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          option: () => "text-medium",
          input: () => "text-semibold",
          control: () => "p-2 border-2",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#36315f28",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;

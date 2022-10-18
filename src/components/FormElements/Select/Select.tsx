import { StyledSelect } from "./style";

interface Value {
  id: string;
  value: string;
}

interface SelectProps {
  values: Value[];
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  firstOption: string;
}

const Select = ({ values, onChange, firstOption }: SelectProps) => {
  return (
    <StyledSelect onChange={(e) => onChange(e)}>
      <option value={firstOption}>{firstOption}</option>
      {values.map(({ id, value }) => (
        <option key={id} value={value}>
          {value}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;

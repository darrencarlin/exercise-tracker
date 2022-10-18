import { StyledInput } from "./style";

interface InputProps {
  value: string;
  placeholder: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const Input = ({ value, onChange, placeholder, type }: InputProps) => {
  return (
    <StyledInput
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;

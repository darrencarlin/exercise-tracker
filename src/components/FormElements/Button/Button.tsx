import { StyledButton } from "./style";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  type,
  children,
  onClick,
  disabled = false,
  className,
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      $disabled={disabled}
      className={className}
    >
      {children}
    </StyledButton>
  );
};
export default Button;

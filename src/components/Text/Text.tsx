import { StyledText } from "./style";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  size?: string;
  m?: string;
}

const Text = ({ children, className, size, m }: TextProps) => (
  <StyledText size={size} m={m} className={className}>
    {children}
  </StyledText>
);

export default Text;

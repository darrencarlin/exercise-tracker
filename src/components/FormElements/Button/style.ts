import styled, { css } from "styled-components";

interface ButtonProps {
  $disabled?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.blue};
  outline: none;
  border: 1px solid transparent;
  font-weight: regular;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.7;
      background-color: ${({ theme }) => theme.colors.disabled};
      pointer-events: none;
    `}
`;

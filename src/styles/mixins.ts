import { css } from "styled-components";

export const Input = () => css`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderGray};
  background: ${({ theme }) => theme.colors.inputGray};
  border-radius: 5px;
  font-size: 1rem;
  margin: 0 0 10px 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.inputColor};
`;

export const Button = () => css`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.blue};
  outline: none;
  border: 1px solid transparent;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
`;

export const Select = () => css`
  ${Input()}
  width: 100%;
  height: 42px;
  color: ${({ theme }) => theme.colors.black};
`;

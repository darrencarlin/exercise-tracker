import styled from "styled-components";

export const Button = styled.button`
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.blue};
  width: fit-content;
  padding: 8px 0;
  outline: none;
  background: transparent;
  border: 1px solid transparent;
  text-decoration: underline;

  &:focus {
    border: 1px solid pink;
  }
`;

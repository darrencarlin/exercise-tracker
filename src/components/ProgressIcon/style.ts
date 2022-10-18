import styled from "styled-components";

export const StyledAvatar = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  border: 1px solid transparent;
`;

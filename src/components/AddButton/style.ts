import styled from "styled-components";

export const StyledAddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue};
  outline: none;
  border: 1px solid transparent;
  box-shadow: ${({ theme }) => theme.shadow.boxShadow};
`;

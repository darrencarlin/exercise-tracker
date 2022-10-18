import styled from "styled-components";

export const Form = styled.form`
  margin: 0 0 10px 0;
  &:last-of-type {
    margin: 0 0 20px 0;
  }

  input {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const GoogleSignupButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.borderGray};
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-size: 1rem;
  svg {
    margin: 0 10px 0 0;
  }
`;

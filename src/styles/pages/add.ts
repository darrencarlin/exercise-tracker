import styled from "styled-components";
import Button from "components/FormElements/Button/Button";
import { Input as StyledInput } from "styles/mixins";

export const Screen = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  @media screen and (min-width: 500px) {
    max-width: 450px;
    max-height: 1000px;
  }
  nav {
    padding: 16px 16px 0 16px;
    margin: 0 0 10px 0;
  }

  main {
    overflow-y: auto;
  }

  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Main = styled.main`
  padding: 0 16px;
`;

export const Controls = styled.footer`
  display: flex;
  justify-content: flex-end;
  padding: 0 16px 16px 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderGray};
  background: ${({ theme }) => theme.colors.inputGray};
  border-radius: 5px;
  font-size: 1rem;
  margin: 0 0 10px 0;
`;

export const StyledSelect = styled.select`
  ${StyledInput()}
  width: 100%;
  height: 42px;
  color: ${({ theme }) => theme.colors.black};
`;

export const DeleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.red};
`;

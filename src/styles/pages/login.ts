import styled from "styled-components";

export const Screen = styled.div<{ $bg: string }>`
  background-image: url(${({ $bg }) => $bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;

  @media screen and (min-width: 500px) {
    max-width: 450px;
    max-height: 1000px;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 100px);
  padding: 0 16px;
  p {
    padding: 0 0 16px 0;
  }
`;

export const AccountTypeButton = styled.button`
  background: transparent;
  outline: none;
  text-decoration: underline;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue};
`;

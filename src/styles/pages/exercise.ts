import styled from "styled-components";

export const Screen = styled.div`
  height: 100vh;
  /* grid container settings */
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "nav"
    "main"
    "footer";

  nav {
    grid-area: nav;
    padding: 16px;
  }

  main {
    grid-area: main;
    overflow: auto;

    @supports (-webkit-touch-callout: none) {
      padding: 0 0 100px 0;
    }
  }
  @media screen and (min-width: 500px) {
    max-width: 450px;
    max-height: 1000px;
  }

  footer {
    grid-area: footer;
    position: sticky;
    bottom: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
  }
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Main = styled.main``;

export const Controls = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderGray};
  background: ${({ theme }) => theme.colors.inputGray};
  border-radius: 5px;
  font-size: 1rem;
  margin: 0 0 10px 0;
`;

export const TitleGroup = styled.div`
  display: grid;
  grid-auto-flow: column;

  justify-content: space-between;
  align-items: center;
  margin: 0 0 10px 0;
`;

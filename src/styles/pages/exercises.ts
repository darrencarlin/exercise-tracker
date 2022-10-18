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

  @media screen and (min-width: 500px) {
    max-height: 1000px;
  }
  nav {
    grid-area: nav;
    padding: 16px;
  }

  main {
    grid-area: main;
    overflow-y: scroll;

    @supports (-webkit-touch-callout: none) {
      padding: 0 0 100px 0;
    }
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
  /* display: flex;
  justify-content: flex-end;
  padding: 16px; */
`;

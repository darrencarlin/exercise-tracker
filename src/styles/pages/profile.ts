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
    max-width: 450px;
    max-height: 800px;
  }
  nav {
    grid-area: nav;
    padding: 16px;
  }

  main {
    grid-area: main;
    overflow: auto;
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

export const Main = styled.main`
  padding: 0 16px;
  margin: 0 0 10px 0;
  > p {
    padding: 0 0 16px 0;
  }
`;

export const Controls = styled.footer`
  padding: 16px;

  button {
    margin: 0 0 10px 0;
  }
`;

export const List = styled.ul`
  list-style: none;
  li {
    margin: 0 0 5px 0;
  }
`;

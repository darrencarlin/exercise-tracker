import styled from "styled-components";

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

  > div {
    padding: 0;
    margin: 0;
  }
`;

export const Main = styled.main`
  > div {
    h3 {
      padding: 0 0 0 16px;
    }
    button {
      padding: 0 16px 0 0;
    }
  }
`;

export const Controls = styled.footer`
  display: flex;
  justify-content: flex-end;
  padding: 0 16px 16px 16px;
`;

export const List = styled.ul`
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderGray};
  margin: 0 0 16px 0;
  /* If the below ever breaks, go to developer.apple.com/library/archive/documentation/… and search for "Safari on iOS only" */

  @supports (-webkit-touch-callout: none) {
    // padding-bottom: 80px;
  }
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGray};
  height: 50px;
  p {
    padding: 0;
  }
`;

export const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0 10px 0 0;
  }
`;

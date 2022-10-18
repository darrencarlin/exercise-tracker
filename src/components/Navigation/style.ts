import styled from "styled-components";

interface SlideOutNavProps {
  navOpen: boolean;
}

export const SlideOutNav = styled.div<SlideOutNavProps>`
  position: absolute;
  left: ${(props) => (props.navOpen ? "0" : "-100%")};
  top: 0;
  width: 80%;
  height: 100vh;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.navOpen ? "1" : "0")};
  border-right: 1px solid ${({ theme }) => theme.colors.borderGray};

  display: flex;
  flex-direction: column;

  @media screen and (min-width: 500px) {
    max-width: 450px;
    max-height: 1000px;
  }
  h3 {
    padding: 1.25rem 1.25rem 0 1.25rem;
    margin: 0 0 2rem 0;
  }

  button {
    margin-top: auto;
    /* position: fixed;
    bottom: 1rem;
    left: 1rem;
    width: calc(80% - 2rem); */
  }

  @supports (-webkit-touch-callout: none) {
    padding-bottom: 80px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const NavItems = styled.ul`
  list-style: none;
`;

export const NavItem = styled.li`
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;

  svg,
  a {
    font-size: 1.2rem;
  }

  svg {
    margin: 0 0.5rem 0 0;
  }
  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;

    font-weight: 600;
  }
`;

export const List = styled.ul`
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderGray};

  /* If the below ever breaks, go to developer.apple.com/library/archive/documentation/… and search for "Safari on iOS only" */

  @supports (-webkit-touch-callout: none) {
    // padding-bottom: 80px;
  }
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGray};
  height: 50px;
  transition: transform 0.6s ease-in-out;

  svg,
  a {
    font-size: 1rem;
  }

  svg {
    font-size: 1.2rem;
    margin: 0 0.5rem 0 0;
  }
  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;

    font-weight: 600;
  }
`;

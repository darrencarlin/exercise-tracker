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
    overflow-y: scroll;

    @supports (-webkit-touch-callout: none) {
      padding: 0 0 72px 0;
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

export const Main = styled.main`
  margin: 0 0 10px 0;

  // make sets scrollable
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px 16px;
`;

export const Controls = styled.footer`
  padding: 16px;
`;

export const Sets = styled.ul`
  height: 100%;
  overflow: auto;

  > div {
    height: 100%;
    overflow: auto;
  }

  border-top: 1px solid ${({ theme }) => theme.colors.borderGray};
`;

export const SetItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGray};
  padding: 10px 20px;
  width: 100%;
  span {
    margin: 0 10px 0 0;
    &:first-of-type {
      margin: 0 15px 0 0;
    }
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-color: red;
  border: none;
`;

export const SetDetails = styled.div`
  display: flex;
  align-items: center;
`;

export const SetNumber = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 15px;

  text-align: center;
  background-color: ${({ theme }) => theme.colors.inputGray};
`;

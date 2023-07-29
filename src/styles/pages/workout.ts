import styled, { css } from "styled-components";

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
  display: grid;
  grid-template-columns: 1fr 45px;
  align-items: center;
  gap: 1rem;
  padding: 16px;
`;

export const EmojiContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.borderGray};
  border-radius: 5px;
  height: 40px;
  z-index: 1;
`;

export const HiddenEmojis = styled.div<{ show: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  bottom: -1000px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: -1;
  opacity: 0;
  ${({ show }) =>
    show &&
    css`
      bottom: 45px;
      opacity: 1;
    `};
  transition: all 0.7s ease-in-out;
`;

export const EmojiSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    appearance: none;
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
  }

  &:active {
    transform: scale(0.9);
  }

  transition: all 0.5s ease-in-out;
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

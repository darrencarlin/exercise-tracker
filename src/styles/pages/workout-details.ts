import styled from "styled-components";
import Button from "components/FormElements/Button/Button";

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

export const Main = styled.main`
  margin: 10px 20px 5px 20px;
`;

export const Controls = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};

  padding: 16px;

  button {
    margin: 0 0 10px 0;
  }
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

export const DeleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.red};
`;

export const WorkoutDate = styled.p`
  display: flex;
  align-items: center;
  font-weight: 400;
  svg {
    margin: 0 5px 0 0;
  }
`;

export const Sets = styled.p`
  display: flex;
  align-items: center;
  svg {
    margin: 0 5px 0 0;
  }
`;

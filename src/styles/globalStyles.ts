import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;400;700&display=swap");

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  font-size: 17px;
}

body {
  font-family: "Roboto", sans-serif;
  line-height: 1.6;
  font-weight: 300;
  /* overflow: hidden; */
  height: 100%;

  @media screen and (min-width: 500px) {
  
    box-shadow: ${({ theme }) => theme.shadow.boxShadow};
    position: relative;
    max-width: 450px;
    margin: 25px auto;
    max-height: 1000px;
    min-height: 800px;
  }
}

b {
  font-weight: bold;
}

p {
  padding: 0 0 16px 0;
}
`;

export default GlobalStyle;

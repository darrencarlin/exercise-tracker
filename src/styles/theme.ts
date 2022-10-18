const theme = {
  colors: {
    black: "#000000",
    white: "#FFFFFF",
    blue: "#006ee6",
    red: "#d11a2a",
    text: "#373d3f",
    green: "#00b159",
    textLight: "#555555",
    borderGray: "#e8e8e8",
    inputGray: "#e6e6e6",
    inputColor: "#333333",
    disabled: "#555555",
  },
  shadow: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  },
};

export default theme;

export type Theme = typeof theme;

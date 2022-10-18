import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import UserDataWrapper from "components/UserDataWrapper/UserDataWrapper";
import store from "../redux/slices";
import GlobalStyle from "styles/globalStyles";
import theme from "styles/theme";

function MyApp({
  Component,
  pageProps,
  pageProps: { session },
  router,
}: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <UserDataWrapper>
            <GlobalStyle />
            <Component {...pageProps} key={router.pathname} />
          </UserDataWrapper>
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;

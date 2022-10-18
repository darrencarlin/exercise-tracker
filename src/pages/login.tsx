import type { NextPageContext } from "next";
import { getProviders, getSession } from "next-auth/react";
import bg from "../../public/images/bg.png";
import FullAccount from "components/SignupForms/FullAccount";
import { Main, Screen } from "styles/pages/login";
import type { Providers } from "../types";

const Login = ({ providers }: Providers) => {
  return (
    <Screen $bg={bg.src}>
      <Main>
        <FullAccount providers={providers} />
      </Main>
    </Screen>
  );
};

export default Login;

export const getServerSideProps = async (context: NextPageContext) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res) {
    return {
      redirect: {
        destination: "/exercises",
      },
    };
  }
  return {
    props: {
      providers: await getProviders(),
    },
  };
};

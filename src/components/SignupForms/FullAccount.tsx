import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Fade from "react-reveal/Fade";
import { Providers } from "../../types";
import ScreenTitle from "../ScreenTitle/ScreenTitle";
import Text from "../Text/Text";
import { Form, GoogleSignupButton } from "./styles";

const FullAccount = ({ providers }: Providers) => {
  const handleSignIn = async (providerId: string) => {
    await signIn(providerId);
  };

  return (
    <Fade>
      <ScreenTitle title="Create Account" />
      <Text>Signup below to track your data across devices</Text>
      <Form>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <GoogleSignupButton
              type="button"
              onClick={() => handleSignIn(provider.id)}
            >
              <FcGoogle /> Continue with {provider.name}
            </GoogleSignupButton>
          </div>
        ))}
      </Form>
    </Fade>
  );
};

export default FullAccount;

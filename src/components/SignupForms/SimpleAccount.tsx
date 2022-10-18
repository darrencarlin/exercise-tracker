import Button from "../FormElements/Button/Button";
import Input from "../FormElements/Input/Input";
import ScreenTitle from "../ScreenTitle/ScreenTitle";
import Text from "../Text/Text";
import Fade from "react-reveal/Fade";
import { Form } from "./styles";

const SimpleAccount = () => (
  <Fade>
    <ScreenTitle title="Create User" />
    <Text>
      If you only plan to track your exercise on this device, we only need your
      name! (You can change this later)
    </Text>
    <Form>
      <Input
        type="text"
        placeholder="Name"
        value=""
        onChange={() => console.log("Testing")}
      />

      <Button type="submit" onClick={() => console.log("Testing")}>
        Get Started
      </Button>
    </Form>
  </Fade>
);

export default SimpleAccount;

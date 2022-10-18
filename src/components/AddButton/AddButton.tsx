import { IoAddOutline } from "react-icons/io5";
import { useTheme } from "styled-components";
import { StyledAddButton } from "./style";

const AddButton = () => {
  const theme = useTheme();

  return (
    <StyledAddButton>
      <IoAddOutline color={theme.colors.white} size="4em" />
    </StyledAddButton>
  );
};

export default AddButton;

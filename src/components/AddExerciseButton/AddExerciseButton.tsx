import React from "react";
import { IoAddOutline } from "react-icons/io5";
import { useTheme } from "styled-components";
import { StyledAddButton } from "./style";

interface AddExerciseButtonProps {
  onClick: () => void;
}

const AddExerciseButton = ({ onClick }: AddExerciseButtonProps) => {
  const theme = useTheme();
  return (
    <StyledAddButton onClick={onClick}>
      <IoAddOutline color={theme.colors.white} size="1.5em" />
    </StyledAddButton>
  );
};

export default AddExerciseButton;

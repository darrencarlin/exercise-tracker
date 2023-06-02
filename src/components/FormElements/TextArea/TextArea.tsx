import { TextareaHTMLAttributes } from "react";
import { StyledTextArea } from "./style";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = (props: TextAreaProps) => {
  return <StyledTextArea {...props} />;
};

export default TextArea;

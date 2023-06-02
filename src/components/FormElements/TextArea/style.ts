import styled from "styled-components";
import { Input } from "styles/mixins";

export const StyledTextArea = styled.textarea`
  ${Input()}
  min-height: 100px;
  resize: vertical;
`;

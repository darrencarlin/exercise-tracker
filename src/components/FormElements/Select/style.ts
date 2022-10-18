import styled from "styled-components";
import { Input } from "styles/mixins";

export const StyledSelect = styled.select`
  ${Input()}
  width: 100%;
  height: 42px;
  color: ${({ theme }) => theme.colors.black};
`;

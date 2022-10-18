import styled from "styled-components";

interface TextProps {
  size?: string;
  m?: string;
}

export const StyledText = styled.p<TextProps>`
  font-weight: 300;
  font-size: ${(props) => props.size ?? "1em"};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
  margin: ${(props) => props.m ?? "0"};
`;

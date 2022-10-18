import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;

  svg {
    display: block;
    height: 30px;
    width: 30px;
  }
`;

interface StyledLinkProps {
  shouldNotRender: boolean;
}

export const StyledLink = styled.a<StyledLinkProps>`
  visibility: ${({ shouldNotRender }) =>
    shouldNotRender ? "hidden" : "visible"};
`;

import styled from "styled-components";

export const StyledAvatar = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  border: 1px solid transparent;
`;

export const ImageWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    outline: none;

    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
`;

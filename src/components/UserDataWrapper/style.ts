import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
`;

export const Loader = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid ${({ theme }) => theme.colors.blue};
  border-right: 2px solid ${({ theme }) => theme.colors.blue};
  border-bottom: 2px solid ${({ theme }) => theme.colors.blue};
  border-left: 4px solid ${({ theme }) => theme.colors.blue};
  background: ${({ theme }) => theme.colors.white};
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;
